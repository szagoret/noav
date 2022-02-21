import {baseApiService} from "src/services/baseApiService";

export interface User {
    username: string
}

export interface UserResponse {
    username: string
    jwt: string
}

export interface LoginRequest {
    username: string
    password: string
}

export const authApiService = baseApiService.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/public/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    })
});

export const {useLoginMutation, useProtectedMutation} = authApiService