import {baseApiService} from "src/services/baseApiService";
import {IdTitleType} from "src/types/IdTitleType";

export const songTopicsApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getTopicById: build.query<IdTitleType | undefined, string>({
            query: (topicId) => ({
                url: `/song/topics/${topicId}`
            }),
        }),
        findAllTopics: build.query<Array<IdTitleType>, void>({
            query: () => ({
                url: `/song/topics`
            }),
        }),
        saveTopic: build.mutation<void, Partial<IdTitleType>>({
            query(body) {
                return {
                    url: `/song/topics`,
                    method: 'POST',
                    body,
                }
            }
        }),
        removeTopic: build.mutation<void, { topicId: string }>({
            query({topicId}) {
                return {
                    url: `/song/topics/${topicId}`,
                    method: 'DELETE'
                }
            }
        })
    }),
    overrideExisting: false,
});

export const {
    useGetTopicByIdQuery,
    useFindAllTopicsQuery,
    useSaveTopicMutation,
    useRemoveTopicMutation
} = songTopicsApiService;