import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';

interface IdDrivenItem {
    id?: string
}

interface ItemEditDialogPropsTypes<T> {
    open: boolean,
    onSave: (item: Partial<T>) => void,
    onClose: () => void,
    getValue: (item: T) => string,
    item: T,
    updateKey: string,
}

const ItemEditDialog = <T extends IdDrivenItem>({
                                                    open,
                                                    onSave,
                                                    onClose,
                                                    getValue,
                                                    item,
                                                    updateKey
                                                }: ItemEditDialogPropsTypes<T>) => {
    const [updatedItem, setUpdatedItem] = useState<T>(item);

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
                        value={getValue(updatedItem)}
                        onChange={(e) => setUpdatedItem((a: T) => ({
                            ...a,
                            [updateKey]: e.target.value
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

export default ItemEditDialog;