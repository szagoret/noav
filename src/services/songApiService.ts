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
        }),
        findSongByCode: build.query<SongType, String>({
            query: (songCode) => ({
                url: `/song/${songCode}`
            })
        }),
        advancedSongSearch: build.query<PaginatedResultType<SongType>, SongSearchQueryType>({
            query: (searchQuery) => ({
                url: `/song/search`,
                params: {...searchQuery}
            })
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
            }
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
} = songApiService;