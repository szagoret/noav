import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {useFindAllVocalsQuery, useRemoveVocalMutation, useSaveVocalMutation} from "src/services/songVocalsApiService";
import {useTranslation} from "react-i18next";

const VocalsAdminTable = () => {
    const {data: vocals, isFetching} = useFindAllVocalsQuery();
    const [saveVocal] = useSaveVocalMutation();
    const [removeVocal] = useRemoveVocalMutation();
    const {t} = useTranslation()
    return (
        <GenericSongPropertyTable
            items={vocals || []}
            loading={isFetching}
            saveItem={saveVocal}
            deleteItem={(id) => removeVocal({vocalId: id})}
            valueKey={'title'}
            valueLabel={t('pages.songs.common.vocal')}
        />
    );
};

export default VocalsAdminTable;