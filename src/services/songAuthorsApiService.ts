import {baseApiService} from "src/services/baseApiService";
import {IdNameType} from "src/types/IdNameType";

export const songAuthorsApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getAuthorById: build.query<IdNameType | undefined, string>({
            query: (authorId) => ({
                url: `/song/authors/${authorId}`
            }),
        }),
        findAllAuthors: build.query<Array<IdNameType>, void>({
            query: () => ({
                url: `/song/authors`
            }),
            providesTags: ['SongAuthors']
        }),
        saveAuthor: build.mutation<void, Partial<IdNameType>>({
            query(body) {
                return {
                    url: `/song/authors`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['SongAuthors']
        }),
        removeAuthor: build.mutation<void, { authorId: string }>({
            query({authorId}) {
                return {
                    url: `/song/authors/${authorId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['SongAuthors']
        })
    }),
    overrideExisting: false,
});

export const {
    useGetAuthorByIdQuery,
    useFindAllAuthorsQuery,
    useSaveAuthorMutation,
    useRemoveAuthorMutation
} = songAuthorsApiService;