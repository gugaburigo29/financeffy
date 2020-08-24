import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserSignUp} from "../../models/user";

interface AuthState {
    user: User | null;
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, payload: PayloadAction<User>) {
            state.user = payload.payload;
        },
        setToken(state, payload: PayloadAction<string>) {
            state.token = payload.payload
        }
    }
})

export default authSlice.reducer;
