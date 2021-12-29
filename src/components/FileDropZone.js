import {useDropzone} from 'react-dropzone';
import {Box, styled, Typography} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import {useTranslation} from "react-i18next";

const DropZoneStyled = styled('div')(({
                                          theme
                                      }) => ({
    label: 'noav',
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(1),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    transition: 'background-color 0.5s',
    backgroundColor: 'rgba(185,185,185,0.54)',
    '&:hover': {
        backgroundColor: 'rgba(169,169,169,0.04)',
        cursor: 'pointer'
    }
}));


const FileDropZone = ({handleDrop}) => {
    const {t} = useTranslation();
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        onDrop: handleDrop
    });
    return (
        <DropZoneStyled {...getRootProps()} >
            <input {...getInputProps()} />
            <Box sx={{
                display: 'inline-flex',
                justifyContent: 'space-between'
            }}>
                <UploadFileIcon/>
                <Typography
                    gutterBottom
                    variant="body1"
                >
                    {t('pages.songs.common.selectFiles')}
                </Typography>
            </Box>
        </DropZoneStyled>
    );
};

export default FileDropZone;