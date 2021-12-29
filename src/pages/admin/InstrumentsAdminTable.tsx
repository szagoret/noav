import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {
    useFindAllInstrumentsQuery,
    useRemoveInstrumentMutation,
    useSaveInstrumentMutation
} from "src/services/songInstrumentsApiService";
import {useTranslation} from "react-i18next";

const InstrumentsAdminTable = () => {
    const {data: instruments, isFetching} = useFindAllInstrumentsQuery();
    const [saveInstrument] = useSaveInstrumentMutation();
    const [removeInstrument] = useRemoveInstrumentMutation();
    const {t} = useTranslation()
    return (
        <GenericSongPropertyTable
            items={instruments || []}
            loading={isFetching}
            saveItem={saveInstrument}
            deleteItem={(id) => removeInstrument({instrumentId: id})}
            valueKey={'title'}
            valueLabel={t('pages.songs.common.instrument')}
        />
    );
};

export default InstrumentsAdminTable;