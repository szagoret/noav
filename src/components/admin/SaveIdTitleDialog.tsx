import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IdTitleType} from "src/types/IdTitleType";

interface SaveIdTitleDialogPropsTypes {
    open: boolean,
    onSave: (item: IdTitleType) => void,
    onClose: () => void,
    item: IdTitleType | null
}

const SaveIdTitleDialog = ({
                               open,
                               onSave,
                               onClose,
                               item
                           }: SaveIdTitleDialogPropsTypes) => {
    const [updatedItem, setUpdatedItem] = useState<any>(item);

    useEffect(() => {
        setUpdatedItem(item);
    }, [item]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    Edit Item
                </DialogContentText>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        value={updatedItem?.title}
                        onChange={(e) => setUpdatedItem((a: any) => ({
                            ...a,
                            name: e.target.value
                        }))}
                    />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSave(updatedItem)}>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveIdTitleDialog;