import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.API_BASE_URL || '';

export const baseApiService = createApi({
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/api`}),
    tagTypes: ['SongFiles'],
    endpoints: () => ({}),
})