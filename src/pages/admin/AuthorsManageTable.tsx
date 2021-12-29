import EntityManageTable from "src/pages/admin/EntityManageTable";
import {
    useFindAllAuthorsQuery,
    useRemoveAuthorMutation,
    useSaveAuthorMutation
} from "src/services/songAuthorsApiService";
import {IdNameType} from "src/types/IdNameType";

const AuthorsManageTable = () => {
    const {data: authors, isLoading} = useFindAllAuthorsQuery();
    const [saveAuthor] = useSaveAuthorMutation();
    const [removeAuthor] = useRemoveAuthorMutation();

    return (
        <EntityManageTable items={authors || []}
                           getValue={(author: IdNameType) => author.name}
                           saveItem={saveAuthor}
                           deleteItem={(author: IdNameType) => removeAuthor({authorId: author.id})}
                           loading={isLoading}
                           valueKey={'name'}/>
    );
};
export default AuthorsManageTable;