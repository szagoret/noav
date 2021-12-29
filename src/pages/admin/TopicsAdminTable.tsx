import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {useFindAllTopicsQuery, useRemoveTopicMutation, useSaveTopicMutation} from "src/services/songTopicsApiService";

const TopicsAdminTable = () => {
    const {data: topics, isFetching} = useFindAllTopicsQuery();
    const [saveTopic] = useSaveTopicMutation();
    const [removeTopic] = useRemoveTopicMutation();

    return (
        <GenericSongPropertyTable
            items={topics || []}
            loading={isFetching}
            saveItem={saveTopic}
            deleteItem={(id) => removeTopic({topicId: id})}
            valueKey={'title'}
            valueLabel={'Topic'}
        />
    );
};

export default TopicsAdminTable;