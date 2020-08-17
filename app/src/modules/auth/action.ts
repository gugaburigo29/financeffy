import {API, SignInParams, User} from "../../models/user";
import {AppThunk, RootState} from "../../config/stores";
import {authSlice} from "./authSlice";

const {setToken, setUser} = authSlice.actions;

export const signout = (params: User): AppThunk => async dispatch => {
    try {
        const {data, status} = await API.signup(params);
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
    } catch (e) {

    }
}

export const signin = (params: SignInParams): AppThunk => async dispatch => {
    try {
        const {data, status} = await API.signin(params);
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
    } catch (e) {

    }
}

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;
