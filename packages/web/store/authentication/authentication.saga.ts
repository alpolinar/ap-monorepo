import { updateUserAccountType } from "./authentication.model";
import { takeLatest, all, call, put } from "redux-saga/effects";

import {
    AUTH_ACTION_TYPES,
    User,
    setUpdateUserAccount,
} from "./authentication.model";

import axios from "axios";

const updateUser = async ({ id, name, email, role }: User): Promise<User> => {
    return (
        await axios.patch<User>(
            `${process.env.NEXT_PUBLIC_NEST_API}/user?id=${id}`,
            {
                name,
                email,
                role,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            }
        )
    ).data;
};

export function* updateUserAccountAsync(action: updateUserAccountType) {
    try {
        const result: User = yield call(updateUser, action.payload);
        yield put(setUpdateUserAccount.success(result));
    } catch (error) {
        yield put(setUpdateUserAccount.failure(error as Error));
    }
}

export function* onUpdateUserAccount() {
    yield takeLatest(
        AUTH_ACTION_TYPES.UPDATE_USER_START,
        updateUserAccountAsync
    );
}

export function* authSaga() {
    yield all([call(onUpdateUserAccount)]);
}
