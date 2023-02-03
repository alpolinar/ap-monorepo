import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../store";
import { IModel, User, actions } from "./authentication.model";

const selectUserReducer = (state: RootState): IModel => state.authentication;

export const selectUser = createSelector(
    [selectUserReducer],
    (auth) => auth.user
);

export const selectToken = createSelector(
    [selectUserReducer],
    (auth) => auth.token
);

export const useAuthentication = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    function setUser(value: User | null) {
        dispatch(actions.setUserState(value));
    }

    function setToken(value: string | null | undefined) {
        dispatch(actions.setToken(value));
    }

    function setUserUpdate({ id, name, email, role }: User) {
        dispatch(
            actions.setUpdateUserAccount.request({ id, name, email, role })
        );
    }

    return {
        user,
        token,
        setUser,
        setToken,
        setUserUpdate,
    };
};
