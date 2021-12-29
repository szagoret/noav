import {Button, LinearProgress, Paper} from "@mui/material";
import GenericIdValueTable from "src/pages/admin/GenericIdValueTable";
import DeleteDialog from "src/pages/admin/DeleteDialog";
import ItemEditDialog from "src/pages/admin/ItemEditDialog";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";

interface IdDrivenItem {
    id?: string
}

interface EntityManageTableProps<T> {
    items: T[],
    getValue: (item: T) => string,
    loading?: boolean,
    saveItem: (item: Partial<T>) => void
    deleteItem: (item: T) => void,
    valueKey: string
}

const EntityManageTable = <T extends IdDrivenItem>({
                                                       items,
                                                       getValue,
                                                       saveItem,
                                                       deleteItem,
                                                       loading,
                                                       valueKey
                                                   }: EntityManageTableProps<T>) => {
    const [deleteDialogProps, setDeleteDialogProps] = useState<{ open: boolean, item: T | null }>({
        open: false,
        item: null
    });
    const [editDialogProps, setEditDialogProps] = useState<{ open: boolean, item: T | null }>({
        open: false,
        item: null
    });

    const handleEditItem = (item: T) => setEditDialogProps({open: true, item});
    const handleDeleteItem = (item: T) => setDeleteDialogProps({open: true, item});


    return (
        <Paper sx={{
            width: '100%',
            p:2,
            overflow: 'hidden'
        }}>
            <Button
                variant={'text'}
                size="small"
                onClick={() => setEditDialogProps({open: true, item: {} as T})}
                endIcon={<AddIcon/>}
            >
                Add
            </Button>
            {loading && <LinearProgress/>}
            <GenericIdValueTable items={items}
                                 getValue={getValue}
                                 handleEditItem={handleEditItem}
                                 handleDeleteItem={handleDeleteItem}/>
            {
                deleteDialogProps.item &&
                <DeleteDialog open={deleteDialogProps.open}
                              handleClose={() => setDeleteDialogProps({open: false, item: null})}
                              handleDeleteItem={() => deleteDialogProps.item && deleteItem(deleteDialogProps.item)}
                              dialogTitle={getValue(deleteDialogProps.item)}/>
            }
            {
                editDialogProps.item &&
                <ItemEditDialog open={editDialogProps.open}
                                onSave={(item: Partial<T>) => {
                                    saveItem(item);
                                    setEditDialogProps({open: false, item: null})
                                }}
                                onClose={() => setEditDialogProps({open: false, item: null})}
                                getValue={getValue}
                                item={editDialogProps.item}
                                updateKey={valueKey}/>
            }

        </Paper>
    );
};

export default EntityManageTable;