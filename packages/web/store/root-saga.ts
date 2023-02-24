import { all, call } from "redux-saga/effects";

import { authSaga } from "@/store/authentication/authentication.saga";
import { productsSaga } from "./product/product.sagas";

export function* rootSaga() {
    yield all([call(authSaga), call(productsSaga)]);
}
