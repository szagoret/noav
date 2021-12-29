import {DataGrid, GridActionsCellItem, GridActionsColDef, GridColDef, GridToolbarContainer} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import DeleteDialog from "src/pages/admin/DeleteDialog";
import ItemAddDialog from "src/pages/admin/ItemAddDialog";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


interface EditToolbarProps {
    setAddDialogOpen: (open: boolean) => void;
}

const EditToolbar = (props: EditToolbarProps) => {
    const {setAddDialogOpen} = props;

    const handleClick = () => {
        setAddDialogOpen(true);
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
};


interface IdDrivenItem {
    id?: string
}

interface GenericSongPropertyTableProps<T extends IdDrivenItem> {
    items: T[],
    loading: boolean,
    saveItem: (item: any) => Promise<any>,
    deleteItem: (id: string) => Promise<any>,
    valueKey: string,
    valueLabel: string
}

const GenericSongPropertyTable = <T extends IdDrivenItem & Record<string, string>>({
                                                                                       valueLabel,
                                                                                       valueKey,
                                                                                       saveItem,
                                                                                       deleteItem,
                                                                                       items,
                                                                                       loading
                                                                                   }: GenericSongPropertyTableProps<T>) => {
    const [deleteDialogProps, setDeleteDialogProps] = useState<{ open: boolean, item: T | null }>({
        open: false,
        item: null
    });
    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);


    const columns: GridColDef[] = [
        {field: valueKey, editable: true, headerName: valueLabel, flex: 1},
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => setDeleteDialogProps({
                        open: true,
                        item: {id: params.id as string, [valueKey]: params.row.name} as T
                    })}
                />
            ],
        } as GridActionsColDef
    ];

    return (
        <div style={{height: 600, width: '100%'}}>
            <DataGrid rows={items || []}
                      columns={columns}
                      editMode={"row"}
                      loading={loading}
                      onCellEditCommit={({field, id, value}, event, details) => {
                          saveItem({id: id as string, [field]: value}).then();
                      }}
                      components={{
                          Toolbar: EditToolbar,
                      }}
                      componentsProps={{
                          toolbar: {setAddDialogOpen},
                      }}
            />
            {
                deleteDialogProps.item &&
                <DeleteDialog open={deleteDialogProps.open}
                              handleClose={() => setDeleteDialogProps({open: false, item: null})}
                              handleDeleteItem={() => deleteDialogProps.item && deleteItem(deleteDialogProps.item.id || '')
                                  .then(() => setDeleteDialogProps({
                                      open: false,
                                      item: null
                                  }))}
                              dialogTitle={deleteDialogProps.item[valueKey] as string}/>
            }
            {
                addDialogOpen &&
                <ItemAddDialog open={addDialogOpen}
                               onSave={(value: string) => saveItem({[valueKey]: value}).then(() => setAddDialogOpen(false))}
                               onClose={() => setAddDialogOpen(false)}/>
            }
        </div>
    );
};

export default GenericSongPropertyTable;