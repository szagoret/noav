import {baseApiService} from "src/services/baseApiService";
import {IdTitleType} from "src/types/IdTitleType";

export const songVocalsApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getVocalById: build.query<IdTitleType | undefined, string>({
            query: (vocalId) => ({
                url: `/song/vocals/${vocalId}`
            }),
            providesTags: ['SongVocals']
        }),
        findAllVocals: build.query<Array<IdTitleType>, void>({
            query: () => ({
                url: `/song/vocals`
            }),
            providesTags: ['SongVocals']
        }),
        saveVocal: build.mutation<void, Partial<IdTitleType>>({
            query(body) {
                return {
                    url: `/song/vocals`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SongVocals']
        }),
        removeVocal: build.mutation<void, { vocalId: string }>({
            query({vocalId}) {
                return {
                    url: `/song/vocals/${vocalId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['SongVocals']
        })
    }),
    overrideExisting: false,
});

export const {
    useGetVocalByIdQuery,
    useFindAllVocalsQuery,
    useSaveVocalMutation,
    useRemoveVocalMutation
} = songVocalsApiService;