import {configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux';

import songAutosuggestionReducer from "src/store/song/songAutosuggestionSlice";
import songAdvancedFiltersReducer from "src/store/song/songAdvancedFiltersSlice";
import {songApiService} from "src/services/songApiService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {songFileApiService} from "src/services/songFileApiService";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [songApiService.reducerPath, songFileApiService.reducerPath, 'songAdvancedFilters']
}

const rootReducer = combineReducers({
    songAutoSuggestion: songAutosuggestionReducer,
    songAdvancedFilters: songAdvancedFiltersReducer,
    [songApiService.reducerPath]: songApiService.reducer,
    [songFileApiService.reducerPath]: songFileApiService.reducer
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
        }).concat(songApiService.middleware, songFileApiService.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch