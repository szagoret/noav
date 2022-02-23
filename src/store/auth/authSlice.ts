import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "src/services/authApiService";
import {RootState} from "src/store/store";

type AuthState = {
    user: User | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null} as AuthState,
    reducers: {
        setCredentials: (
            state,
            {payload: {user, token}}: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = user
            state.token = token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
})

export const {setCredentials, logout} = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
