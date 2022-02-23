import {SongType} from "src/types/SongType";
import {Box, Typography} from "@mui/material";
import {chain} from 'lodash';
import ImageIcon from '@mui/icons-material/Image';
import React from "react";
import SongFilePreview from "src/components/SongFilePreview";

const SongCoverImage = ({song}: { song: SongType | undefined }) => {

    const primaryFile = chain(song?.files).find('primary').value();
    return (
        <>
            {primaryFile ? <SongFilePreview songCode={song?.code || ""} file={primaryFile}/> :
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
                </Box>}
        </>
    )
};

export default SongCoverImage;