import GenericSongPropertyTable from "src/pages/admin/GenericSongPropertyTable";
import {
    useFindAllInstrumentsQuery,
    useRemoveInstrumentMutation,
    useSaveInstrumentMutation
} from "src/services/songInstrumentsApiService";

const InstrumentsAdminTable = () => {
    const {data: instruments, isFetching} = useFindAllInstrumentsQuery();
    const [saveInstrument] = useSaveInstrumentMutation();
    const [removeInstrument] = useRemoveInstrumentMutation();

    return (
        <GenericSongPropertyTable
            items={instruments || []}
            loading={isFetching}
            saveItem={saveInstrument}
            deleteItem={(id) => removeInstrument({instrumentId: id})}
            valueKey={'title'}
            valueLabel={'Instrument'}
        />
    );
};

export default InstrumentsAdminTable;