import React, {useMemo} from 'react';
import {Box, CircularProgress, IconButton} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useCanMakeFilePrimary from "src/utils/useCanMakeFilePrimary";
import {useMakeSongFilePrimaryMutation} from "src/services/songFileApiService";

const SongFileMakePrimaryAction = ({
                                       file,
                                       songCode
                                   }) => {
    const canMakePrimary = useCanMakeFilePrimary(file);
    const hasPreview = useMemo(() => !!file.thumbnails.length, [file]);
    const [makeSongFilePrimary, {isLoading: isUpdating}] = useMakeSongFilePrimaryMutation();

    const makeFilePrimary = async (isPrimary) => {
        await makeSongFilePrimary({songCode, fileCode: file.code, isPrimary});
    };

    const ActionIcon = useMemo(() => {
        if (!canMakePrimary || !hasPreview) {
            return null;
        } else if (isUpdating) {
            return <CircularProgress size={31}/>;
        } else if (file.primary) {
            return (
                <IconButton edge="end" onClick={() => makeFilePrimary(false)} size="small">
                    <CheckCircleIcon color={'success'}/>
                </IconButton>);
        } else {
            return (
                <IconButton edge="end" onClick={() => makeFilePrimary(true)} size="small">
                    <CheckCircleOutlineIcon/>
                </IconButton>);
        }
    }, [canMakePrimary, isUpdating, file]);

    return (
        <Box>
            {ActionIcon}
        </Box>
    );
};

export default SongFileMakePrimaryAction;