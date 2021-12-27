import {baseApiService} from "src/services/baseApiService";
import {IdTitleType} from "src/types/IdTitleType";

export const songVocalsApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getVocalById: build.query<IdTitleType | undefined, string>({
            query: (vocalId) => ({
                url: `/song/vocals/${vocalId}`
            }),
        }),
        findAllVocals: build.query<Array<IdTitleType>, void>({
            query: () => ({
                url: `/song/vocals`
            }),
        }),
        saveVocal: build.mutation<void, Partial<IdTitleType>>({
            query(body) {
                return {
                    url: `/song/vocals`,
                    method: 'POST',
                    body,
                }
            }
        }),
        removeVocal: build.mutation<void, { vocalId: string }>({
            query({vocalId}) {
                return {
                    url: `/song/vocals/${vocalId}`,
                    method: 'DELETE'
                }
            }
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