import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://daswort-api.herokuapp.com';

console.log(BASE_URL);
export const baseApiService = createApi({
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/api`}),
    tagTypes: ['Songs', 'SongFiles', 'SongAuthors', 'SongVocals', 'SongInstruments', 'SongTopics'],
    endpoints: () => ({}),
})