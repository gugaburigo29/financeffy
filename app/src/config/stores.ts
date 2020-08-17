import {combineReducers, configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
