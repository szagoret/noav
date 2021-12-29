import {baseApiService} from "src/services/baseApiService";
import {SongType} from "src/types/SongType";
import {SongSearchQueryType} from "src/types/SongSearchQueryType";
import {PaginatedResultType} from "src/types/PaginatedResultType";
import {SongPropertiesType} from "src/types/SongPropertiesType";

export const songApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        searchSongByName: build.query<Array<SongType>, String>({
            query: (searchTerm) => ({
                url: `/song/find`,
                params: {searchTerm}
            }),
            providesTags: ['Songs']
        }),
        findSongByCode: build.query<SongType, String>({
            query: (songCode) => ({
                url: `/song/${songCode}`
            }),
            providesTags: ['Songs']
        }),
        advancedSongSearch: build.query<PaginatedResultType<SongType>, SongSearchQueryType>({
            query: (searchQuery) => ({
                url: `/song/search`,
                params: {...searchQuery}
            }),
            providesTags: ['Songs']
        }),
        fetchSongProperties: build.query<SongPropertiesType, void>({
            query: () => ({
                url: `/song/properties`
            })

        }),
        saveSong: build.mutation<Partial<SongType>, Partial<SongType>>({
            query(body) {
                return {
                    url: `/song`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Songs']
        }),
        removeSong: build.mutation<void, { songCode: string }>({
            query({songCode}) {
                return {
                    url: `/song/${songCode}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Songs']
        })
    }),
    overrideExisting: false,
});

export const {
    useSearchSongByNameQuery,
    useFindSongByCodeQuery,
    useAdvancedSongSearchQuery,
    useFetchSongPropertiesQuery,
    useSaveSongMutation,
    useRemoveSongMutation
} = songApiService;