import IdTitleTable from "src/components/admin/IdTitleTable";
import {useFindAllInstrumentsQuery} from "src/services/songInstrumentsApiService";
import {IdTitleType} from "src/types/IdTitleType";
import {Box} from "@mui/material";
import SaveIdTitleDialog from "src/components/admin/SaveIdTitleDialog";
import IdTitleDeleteDialog from "src/components/admin/IdTitleDeleteDialog";
import {useState} from "react";

const InstrumentsTable = () => {
    const {data, isLoading} = useFindAllInstrumentsQuery();
    const [deleteDialogProps, setDeleteDialogProps] = useState<{ open: boolean, item: IdTitleType | null }>({
        open: false,
        item: null
    });
    const [editDialogProps, setEditDialogProps] = useState<{ open: boolean, item: IdTitleType | null }>({
        open: false,
        item: null
    });

    const handleEditItem = (item: IdTitleType) => setEditDialogProps({open: true, item});
    const handleDeleteItem = (item: IdTitleType) => setDeleteDialogProps({open: true, item});

    const deleteItem = () => {

    };

    const saveItem = () => {

    };
    return (
        <Box>
            <IdTitleTable items={data || []}
                          loading={isLoading}
                          handleEditItem={handleEditItem}
                          handleDeleteItem={handleDeleteItem}/>
            <IdTitleDeleteDialog open={deleteDialogProps.open}
                                 handleClose={() => setDeleteDialogProps({open: false, item: null})}
                                 handleDeleteItem={deleteItem}
                                 dialogTitle={deleteDialogProps.item?.title || ''}/>

            <SaveIdTitleDialog open={editDialogProps.open}
                               onSave={saveItem}
                               onClose={() => setEditDialogProps({open: false, item: null})}
                               item={editDialogProps.item}/>
        </Box>
    );

};

export default InstrumentsTable;