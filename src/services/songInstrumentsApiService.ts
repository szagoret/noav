import {baseApiService} from "src/services/baseApiService";
import {IdTitleType} from "src/types/IdTitleType";

export const songInstrumentsApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getInstrumentById: build.query<IdTitleType | undefined, string>({
            query: (instrumentId) => ({
                url: `/song/instruments/${instrumentId}`
            }),
        }),
        findAllInstruments: build.query<Array<IdTitleType>, void>({
            query: () => ({
                url: `/song/instruments`
            }),
            providesTags: ['SongInstruments']
        }),
        saveInstrument: build.mutation<void, Partial<IdTitleType>>({
            query(body) {
                return {
                    url: `/song/instruments`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SongInstruments']
        }),
        removeInstrument: build.mutation<void, { instrumentId: string }>({
            query({instrumentId}) {
                return {
                    url: `/song/instruments/${instrumentId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['SongInstruments']
        })
    }),
    overrideExisting: false,
});

export const {
    useGetInstrumentByIdQuery,
    useFindAllInstrumentsQuery,
    useSaveInstrumentMutation,
    useRemoveInstrumentMutation
} = songInstrumentsApiService;