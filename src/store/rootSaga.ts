import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "../sagas/category.saga";
import { userSagas } from "../sagas/user.saga";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}
