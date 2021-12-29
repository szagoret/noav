import React, {useState} from 'react';
import {DataGrid, GridActionsCellItem, GridActionsColDef, GridColDef, GridToolbarContainer} from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useFindAllAuthorsQuery,
    useRemoveAuthorMutation,
    useSaveAuthorMutation
} from "src/services/songAuthorsApiService";
import DeleteDialog from "src/pages/admin/DeleteDialog";
import {IdNameType} from "src/types/IdNameType";
import ItemAddDialog from "src/pages/admin/ItemAddDialog";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


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


const AuthorsMuiTable = () => {
    const {t} = useTranslation();
    const {data: authors, isFetching} = useFindAllAuthorsQuery();
    const [saveAuthor] = useSaveAuthorMutation();
    const [removeAuthor] = useRemoveAuthorMutation();
    const [deleteDialogProps, setDeleteDialogProps] = useState<{ open: boolean, item: IdNameType | null }>({
        open: false,
        item: null
    });
    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {field: 'name', editable: true, headerName: 'Name', flex: 1},
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
                        item: {id: params.id as string, name: params.row.name}
                    })}
                />
            ],
        } as GridActionsColDef
    ];
    return (
        <div style={{height: 600, width: '100%'}}>
            <DataGrid rows={authors || []}
                      columns={columns}
                      editMode={"row"}
                      loading={isFetching}
                      onCellEditCommit={({field, id, value}, event, details) => {
                          saveAuthor({id: id as string, [field]: value});
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
                              handleDeleteItem={() => deleteDialogProps.item && removeAuthor({authorId: deleteDialogProps.item.id})
                                  .then(() => setDeleteDialogProps({
                                      open: false,
                                      item: null
                                  }))}
                              dialogTitle={deleteDialogProps.item.name}/>
            }
            {
                addDialogOpen &&
                <ItemAddDialog open={addDialogOpen}
                               onSave={(value: string) => saveAuthor({name: value}).then(() => setAddDialogOpen(false))}
                               onClose={() => setAddDialogOpen(false)}/>
            }
        </div>
    );
};

export default AuthorsMuiTable;