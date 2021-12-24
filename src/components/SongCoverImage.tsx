import {SongType} from "src/types/SongType";
import {Box, Typography} from "@mui/material";
import {chain} from 'lodash';
import ImageIcon from '@mui/icons-material/Image';
import {useMemo} from "react";

const SongCoverImage = ({song}: { song: SongType | undefined }) => {

    const imgSrc = useMemo(() => {
        const primaryFile = chain(song?.files).find('primary').value();
        const thumbnail = primaryFile?.thumbnails?.find(t => t.type === "LG");
        if (!!thumbnail) {
            return `${process.env.REACT_APP_API_BASE_URL}/api/song/${song?.code}/files/${primaryFile.code}/thumbs/${thumbnail.code}`;
        }
    }, [song]);


    return (
        <>
            {
                !!imgSrc ?
                    <Box>
                        <img
                            width="100%"
                            src={imgSrc}
                            alt={song?.title}
                        />
                    </Box>
                    :
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '400px',
                        height: '100px',
                        backgroundColor: '#efefef',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageIcon fontSize={'large'}/>
                        <Typography>
                            {song?.title}
                        </Typography>
                    </Box>
            }
        </>
    );
};

export default SongCoverImage;