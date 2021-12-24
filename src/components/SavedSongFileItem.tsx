import {SongFileType} from "src/types/SongFileType";
import bytesToSize from "src/utils/bytesToSize";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import SongFileIcon from "src/components/SongFileIcon";
import SongFileMakePrimaryAction from "src/components/SongFileMakePrimaryAction";
import SongFileThumbnailAction from "src/components/SongFileThumbnailAction";
import SongFileDeleteAction from "src/components/SongFileDeleteAction";

interface SavedSongFileItemPropsTypes {
    songCode: string,
    file: SongFileType
}

const SavedSongFileItem = ({file, songCode}: SavedSongFileItemPropsTypes) => {

    return (
        <ListItem divider>
            <ListItemIcon>
                <SongFileIcon extension={file.extension}/>
            </ListItemIcon>
            <ListItemText primary={file.name}
                          primaryTypographyProps={{
                              variant: 'body2',
                              sx: {
                                  whiteSpace: 'break-spaces'
                              }
                          }}
                          secondary={file.size && bytesToSize(file.size)}
            />
            <SongFileMakePrimaryAction file={file} songCode={songCode}/>
            <SongFileThumbnailAction file={file} songCode={songCode}/>
            <SongFileDeleteAction file={file} songCode={songCode}/>
        </ListItem>
    );
};

export default SavedSongFileItem;