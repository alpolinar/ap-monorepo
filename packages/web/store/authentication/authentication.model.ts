import {
    ActionType,
    createAction,
    createAsyncAction,
    getType,
} from "typesafe-actions";

export enum AUTH_ACTION_TYPES {
    SET_USER_STATE = "authentication/SET_USER_STATE",
    SET_TOKEN = "authentication/SET_TOKEN",
    UPDATE_USER_START = "authentication/UPDATE_USER_START",
    UPDATE_USER_SUCCESS = "authentication/UPDATE_USER_SUCCESS",
    UPDATE_USER_FAILED = "authentication/UPDATE_USER_FAILED",
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export const setUserState = createAction(
    AUTH_ACTION_TYPES.SET_USER_STATE
)<User | null>();

export const setToken = createAction(AUTH_ACTION_TYPES.SET_TOKEN)<
    string | null | undefined
>();

export const setUpdateUserAccount = createAsyncAction(
    AUTH_ACTION_TYPES.UPDATE_USER_START,
    AUTH_ACTION_TYPES.UPDATE_USER_SUCCESS,
    AUTH_ACTION_TYPES.UPDATE_USER_FAILED
)<User, User, Error>();

export type updateUserAccountType = ActionType<
    typeof setUpdateUserAccount.request
>;

export const actions = {
    setUserState,
    setToken,
    setUpdateUserAccount,
};

export interface IModel {
    readonly user: User | null;
    readonly token?: string | null;
    readonly isLoading: boolean;
    readonly error?: Error | null;
}

export const USER_INITIAL_STATE: IModel = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

export const authenticationReducer = (
    state: IModel = USER_INITIAL_STATE,
    action: ActionType<typeof actions>
): IModel => {
    switch (action.type) {
        case getType(setUserState):
            return { ...state, user: action.payload };
        case getType(setToken):
            return { ...state, token: action.payload };
        case getType(setUpdateUserAccount.request):
            return { ...state, isLoading: true };
        case getType(setUpdateUserAccount.success):
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };
        case getType(setUpdateUserAccount.failure):
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
