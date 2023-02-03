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
        await axios.post<User>("http://localhost:3000/api/users/update-user", {
            id,
            name,
            email,
            role,
        })
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
