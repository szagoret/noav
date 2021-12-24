import React, {useState} from 'react';
import {Button, Card, CardMedia, Dialog, DialogActions} from '@mui/material';
import {SongFileType} from "src/types/SongFileType";

interface ShowFilePreviewModalPropsTypes {
    songCode: string,
    file: SongFileType,
    open: boolean,
    handleClose: () => void
}

export const FILE_SIZE_LG = 'LG';
export const FILE_SIZE_SM = 'SM';
const ShowFilePreviewModal = ({file, open, songCode, handleClose}: ShowFilePreviewModalPropsTypes) => {
    const [fileSize, setFileSize] = useState<'SM' | 'LG'>(FILE_SIZE_LG);


    const getFileSrc = () => {
        let thumbnail;
        if (fileSize === FILE_SIZE_SM) {
            thumbnail = file.thumbnails.find(t => t.type === FILE_SIZE_SM);
        } else if (fileSize === FILE_SIZE_LG) {
            thumbnail = file.thumbnails.find(t => t.type === FILE_SIZE_LG);
        }

        if (!!thumbnail) {
            return `${process.env.REACT_APP_API_BASE_URL}api/song/${songCode}/files/${file.code}/thumbs/${thumbnail.code}`;
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Card raised={false} sx={{
                borderRadius: 0,
                minWidth: '300px'
            }}>
                <CardMedia
                    component="img"
                    image={getFileSrc()}
                    alt="green iguana"
                />
            </Card>
            <DialogActions sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255,255,255,0.3)',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: 0,
                margin: 0,
            }}>
                <div>
                    <Button type={'button'} disabled={fileSize === FILE_SIZE_SM}
                            onClick={() => setFileSize(FILE_SIZE_SM)}>SM</Button>
                    <Button type={'button'} disabled={fileSize === FILE_SIZE_LG}
                            onClick={() => setFileSize(FILE_SIZE_LG)}>LG</Button>
                    <Button type={'button'} onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default ShowFilePreviewModal;