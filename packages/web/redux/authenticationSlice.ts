import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IUserState {
    id: string;
    username: string;
    verified: boolean;
    name: string;
    email: string;
}

interface IAppState {
    user: IUserState | null;
    token?: string | null | undefined;
}

const initialState: IAppState = {
    user: null,
    token: null,
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState | null>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null | undefined>) => {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = authenticationSlice.actions;

export const selectUserState = (state: RootState) => state.authentication.user;
export const selectToken = (state: RootState) => state.authentication.token;

export default authenticationSlice.reducer;
