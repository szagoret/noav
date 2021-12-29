import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {
    useFindAllAuthorsQuery,
    useRemoveAuthorMutation,
    useSaveAuthorMutation
} from "src/services/songAuthorsApiService";

const AuthorsAdminTable = () => {
    const {data: authors, isFetching} = useFindAllAuthorsQuery();
    const [saveAuthor] = useSaveAuthorMutation();
    const [removeAuthor] = useRemoveAuthorMutation();

    return (
        <GenericSongPropertyTable
            items={authors || []}
            loading={isFetching}
            saveItem={saveAuthor}
            deleteItem={(id) => removeAuthor({authorId: id})}
            valueKey={'name'}
            valueLabel={'Author'}
        />
    );
};

export default AuthorsAdminTable;