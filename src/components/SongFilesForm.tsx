import {Box, Divider, List} from "@mui/material";
import SavedSongFileItem from "src/components/SavedSongFileItem";
import UploadSongFilesForm from "src/components/UploadSongFilesForm";
import {useGetFilesBySongCodeQuery} from "src/services/songFileApiService";

interface SongFilesFormPropsTypes {
    songCode: string
}

const SongFilesForm = ({songCode}: SongFilesFormPropsTypes) => {
    const {data: files} = useGetFilesBySongCodeQuery(songCode);
    return (
        <Box>
            <List>
                {files?.map((file, i) => (
                    <div key={i}>
                        <SavedSongFileItem file={file} songCode={songCode}/>
                        <Divider/>
                    </div>
                ))}
                <UploadSongFilesForm songCode={songCode}/>
            </List>
        </Box>
    );
};

export default SongFilesForm;