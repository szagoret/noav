import React, {useMemo} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useDeleteSongFileMutation} from "src/services/songFileApiService";

const SongFileDeleteAction = ({file, songCode}) => {
    const [open, setOpen] = React.useState(false);
    const [deleteSongFile, {isLoading: isDeleting}] = useDeleteSongFileMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDeleteSongFile = async () => {
        handleClose();
        await deleteSongFile({songCode, fileCode: file.code});
    };

    const ActionIcon = useMemo(() => {
        if (isDeleting) {
            return <CircularProgress size={31} color={'error'}/>;
        } else {
            return (
                <IconButton edge="end" onClick={handleClickOpen} size={'small'}>
                    <CloseIcon sx={{color: 'red'}}/>
                </IconButton>
            );
        }

    }, []);

    return (
        <Box>
            {ActionIcon}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Are you sure that you want to delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {file.name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDeleteSongFile} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SongFileDeleteAction;