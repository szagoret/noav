import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "src/store/store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!BASE_URL) {
    throw new Error('BASE_URL env var is missing');
}

console.log(`Base url: ${BASE_URL}`);
export const baseApiService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Songs', 'SongFiles', 'SongAuthors', 'SongVocals', 'SongInstruments', 'SongTopics'],
    endpoints: () => ({}),
})