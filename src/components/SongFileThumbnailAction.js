import React, {useMemo, useState} from 'react';
import {Box, CircularProgress, IconButton} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import CropOriginalSharpIcon from '@mui/icons-material/CropOriginalSharp';
import useCanMakeFilePrimary from "src/utils/useCanMakeFilePrimary";
import {useCreateFileThumbnailMutation} from "src/services/songFileApiService";
import ShowFilePreviewModal from "./SongFilePreviewModal";

const SongFileThumbnailAction = ({
                                     file,
                                     songCode
                                 }) => {

    const [openPreview, setOpenPreview] = useState(false);
    const canMakeThumbnail = useCanMakeFilePrimary(file);
    const hasPreview = useMemo(() => !!file.thumbnails.length, [file, songCode]);
    const [createFileThumbnail, {isLoading}] = useCreateFileThumbnailMutation()


    const createFilePreview = async (file) => {
        await createFileThumbnail({songCode, fileCode: file.code});
    };

    const ActionIcon = useMemo(() => {
        if (!canMakeThumbnail) {
            return null;
        } else if (isLoading) {
            return <CircularProgress size={31}/>;
        } else if (hasPreview) {
            return (
                <IconButton edge="end"
                            onClick={() => setOpenPreview(true)}
                            size={'small'}>
                    <PreviewIcon color={'primary'}/>
                </IconButton>);
        } else {
            return (
                <IconButton edge="end"
                            onClick={() => createFilePreview(file)}
                            size={'small'}>
                    <CropOriginalSharpIcon color={'action'}/>
                </IconButton>
            );
        }
    }, [canMakeThumbnail, isLoading, file]);

    return (
        <Box>
            {ActionIcon}
            <ShowFilePreviewModal
                file={file}
                songCode={songCode}
                open={openPreview}
                handleClose={() => setOpenPreview(false)}
            />
        </Box>
    );
};

export default SongFileThumbnailAction;