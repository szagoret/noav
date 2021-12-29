import {useCallback, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import FileDropZone from "src/components/FileDropZone";
import {Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import bytesToSize from "src/utils/bytesToSize";
import {LoadingButton} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {useSaveSongFileMutation} from "src/services/songFileApiService";
import {useTranslation} from "react-i18next";

interface UploadSongFilesFormPropsTypes {
    songCode: string
}

type WrappedFile = {
    file: File,
    localId: string
}
const UploadSongFilesForm = ({songCode}: UploadSongFilesFormPropsTypes) => {
    const {t} = useTranslation();
    const [saveSongFile, {isLoading: isUpdating}] = useSaveSongFileMutation()

    const [unsavedFiles, setUnsavedFiles] = useState<WrappedFile[]>([]);

    const handleDrop = useCallback((acceptedFiles) => {
        const wrappedFiles = acceptedFiles.map((file: File) => ({
            file,
            localId: uuidv4()
        }));
        setUnsavedFiles((prevFiles) => [...prevFiles].concat(wrappedFiles));
    }, []);

    const removeUnsavedFile = (wrappedFile: WrappedFile) => {
        setUnsavedFiles(unsavedFiles.filter((f) => f.localId !== wrappedFile.localId));
    };

    const handleRemoveAll = () => {
        setUnsavedFiles([]);
    };


    const uploadSongFiles = () => {
        const files = unsavedFiles.map(({file}) => file);
        saveSongFile({songCode, files}).then(() => handleRemoveAll());
    }


    return (
        <Box>
            <FileDropZone handleDrop={handleDrop}/>
            <List>
                {unsavedFiles.map((wrappedFile, i) => (
                    <ListItem
                        divider={i < unsavedFiles.length - 1}
                        key={i}
                    >
                        <ListItemIcon>
                            <FileCopyIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={wrappedFile.file.name}
                            primaryTypographyProps={{
                                variant: 'body2',
                                sx: {
                                    whiteSpace: 'break-spaces'
                                }
                            }}
                            secondary={bytesToSize(wrappedFile.file.size)}
                        />
                        <IconButton edge="end" onClick={() => removeUnsavedFile(wrappedFile)} size="large">
                            <DeleteForeverIcon/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            {
                !!unsavedFiles.length &&
                <div>
                    <Button onClick={handleRemoveAll} size="small">
                        {t('pages.songs.common.removeAll')}
                    </Button>
                    <LoadingButton
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="outlined"
                        onClick={() => uploadSongFiles()}
                    >
                        {t('pages.songs.common.uploadFiles')}
                    </LoadingButton>
                </div>
            }
        </Box>
    );
};

export default UploadSongFilesForm;