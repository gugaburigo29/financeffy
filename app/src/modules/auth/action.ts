import {API, SignInParams, User, UserSignUp} from "../../models/user";
import {AppThunk, RootState} from "../../config/stores";
import {authSlice} from "./authSlice";
import history from "../../history";

const {setToken, setUser} = authSlice.actions;
const TOKEN_KEY = 'token';

export const signup = (params: User): AppThunk => async dispatch => {
    try {
        const {data, status} = await API.signup(params);
        localStorage.setItem(TOKEN_KEY, data.token);
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
    } catch (e) {

    }
}

export const signin = (params: SignInParams): AppThunk => async dispatch => {
    try {
        const {data, status} = await API.signin(params);
        localStorage.setItem(TOKEN_KEY, data.token);
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
    } catch (e) {

    }
}

export const loadUser = (token = localStorage.getItem(TOKEN_KEY)): AppThunk => async dispatch => {
    try {
        const {data, status} = await API.me(token || "");
        dispatch(setUser(data));
        history.push('/dashboard');
    } catch (e) {
        history.push('/');
    }
}

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;
