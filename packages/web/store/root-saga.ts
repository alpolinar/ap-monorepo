import { all, call } from "redux-saga/effects";

import { authSaga } from "@/store/authentication/authentication.saga";

export function* rootSaga() {
    yield all([call(authSaga)]);
}
