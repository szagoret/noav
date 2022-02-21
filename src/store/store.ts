import {configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux';

import songAutosuggestionReducer from "src/store/song/songAutosuggestionSlice";
import songAdvancedFiltersReducer from "src/store/song/songAdvancedFiltersSlice";
import authReducer from "src/store/auth/authSlice";
import {songApiService} from "src/services/songApiService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {songFileApiService} from "src/services/songFileApiService";
import {authApiService} from "src/services/authApiService";
import {rtkQueryErrorMiddleware} from "src/store/rtkQueryErrorMiddleware";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [songApiService.reducerPath, songFileApiService.reducerPath, authApiService.reducerPath, 'songAdvancedFilters']
}

const rootReducer = combineReducers({
    songAutoSuggestion: songAutosuggestionReducer,
    songAdvancedFilters: songAdvancedFiltersReducer,
    auth: authReducer,
    [songApiService.reducerPath]: songApiService.reducer,
    [songFileApiService.reducerPath]: songFileApiService.reducer,
    [authApiService.reducerPath]: authApiService.reducer

});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    //@ts-ignore
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(songApiService.middleware, songFileApiService.middleware, authApiService.middleware, rtkQueryErrorMiddleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch