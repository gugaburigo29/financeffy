import {api} from "../../config/api";

export interface User {
    id?: number;
    cpf: string;
    name: string;
    email: string;
    dataNascimento: string;
    password?: string;
    image?: string;
}

export interface UserSignUp {
    email: string;
    password: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

export class API {

    static signin(params: SignInParams) {
        return api.post<AuthResponse>('/users/signin', params)
    }

    static signup(params: User) {
        return api.post<AuthResponse>('/users/signup', params)
    }

    static me(token: string) {
        return api.get<User>('/users/me', {params: {token}})
    }

}
