import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApiService = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['SongFiles'],
    endpoints: () => ({}),
})