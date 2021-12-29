import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {
    useFindAllAuthorsQuery,
    useRemoveAuthorMutation,
    useSaveAuthorMutation
} from "src/services/songAuthorsApiService";
import {useTranslation} from "react-i18next";

const AuthorsAdminTable = () => {
    const {data: authors, isFetching} = useFindAllAuthorsQuery();
    const [saveAuthor] = useSaveAuthorMutation();
    const [removeAuthor] = useRemoveAuthorMutation();
    const {t} = useTranslation();

    return (
        <GenericSongPropertyTable
            items={authors || []}
            loading={isFetching}
            saveItem={saveAuthor}
            deleteItem={(id) => removeAuthor({authorId: id})}
            valueKey={'name'}
            valueLabel={t('pages.songs.common.author')}
        />
    );
};

export default AuthorsAdminTable;