import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from "@mui/material";
import React, {useState} from "react";
import {trim} from "lodash";
import {useTranslation} from "react-i18next";

interface ItemAddDialogProps {
    open: boolean,
    onClose: () => void,
    onSave: (value: string) => void
}

const ItemAddDialog = ({open, onClose, onSave}: ItemAddDialogProps) => {
    const [value, setValue] = useState<string>('');
    const {t} = useTranslation();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    Add Item
                </DialogContentText>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px'
                }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSave(value)} disabled={!trim(value)}>{t('common.save')}</Button>
                <Button onClick={() => {
                    setValue('');
                    onClose();
                }}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ItemAddDialog;