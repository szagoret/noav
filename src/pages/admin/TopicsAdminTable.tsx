import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {useFindAllTopicsQuery, useRemoveTopicMutation, useSaveTopicMutation} from "src/services/songTopicsApiService";
import {useTranslation} from "react-i18next";

const TopicsAdminTable = () => {
    const {data: topics, isFetching} = useFindAllTopicsQuery();
    const [saveTopic] = useSaveTopicMutation();
    const [removeTopic] = useRemoveTopicMutation();
    const {t} = useTranslation()

    return (
        <GenericSongPropertyTable
            items={topics || []}
            loading={isFetching}
            saveItem={saveTopic}
            deleteItem={(id) => removeTopic({topicId: id})}
            valueKey={'title'}
            valueLabel={t('pages.songs.common.topic')}
        />
    );
};

export default TopicsAdminTable;