import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {useFindAllVocalsQuery, useRemoveVocalMutation, useSaveVocalMutation} from "src/services/songVocalsApiService";

const VocalsAdminTable = () => {
    const {data: vocals, isFetching} = useFindAllVocalsQuery();
    const [saveVocal] = useSaveVocalMutation();
    const [removeVocal] = useRemoveVocalMutation();

    return (
        <GenericSongPropertyTable
            items={vocals || []}
            loading={isFetching}
            saveItem={saveVocal}
            deleteItem={(id) => removeVocal({vocalId: id})}
            valueKey={'title'}
            valueLabel={'Vocal'}
        />
    );
};

export default VocalsAdminTable;