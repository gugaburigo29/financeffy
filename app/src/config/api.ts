import axios from "axios";

const HOST = 'http://localhost:3333';

export const api = axios.create({
    baseURL: HOST
})

export const apiToken = axios.create({
    baseURL: HOST
})

apiToken.interceptors.request.use(
    value => {
        value.headers['X-AUTH-TOKEN'] = localStorage.getItem("token");
        return value;
    }
)
