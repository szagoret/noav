import {Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography} from "@mui/material";

interface IdTitleDeleteDialogPropsTypes {
    open: boolean,
    handleClose: () => void,
    handleDeleteItem: () => void,
    dialogTitle: string
}

const IdTitleDeleteDialog = ({open, handleClose, dialogTitle, handleDeleteItem}: IdTitleDeleteDialogPropsTypes) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete
                    <Typography variant={'h6'} component="p">
                        {dialogTitle}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteItem} color="primary">
                    Yes
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdTitleDeleteDialog;