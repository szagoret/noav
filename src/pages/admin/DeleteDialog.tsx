import {Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

interface DeleteDialogPropsTypes {
    open: boolean,
    handleClose: () => void,
    handleDeleteItem: () => void,
    dialogTitle: string
}

const DeleteDialog = ({
                          open,
                          handleClose,
                          dialogTitle,
                          handleDeleteItem
                      }: DeleteDialogPropsTypes) => {
    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('common.deleteConfirmation')}
                    <br/>
                    <Typography variant={'h6'} component="span">
                        {dialogTitle}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteItem} color="primary">
                    {t('common.yes')}
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    {t('common.no')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;