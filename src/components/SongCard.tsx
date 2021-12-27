import {Card, CardContent, Typography} from "@mui/material";
import {SongType} from "src/types/SongType";
import {join, map} from 'lodash';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface SongCardProps {
    song: SongType
}

const SongCard = ({song}: SongCardProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <Card variant="outlined" sx={{
            height: '180px',
            '&:hover': {
                boxShadow: 2,
                cursor: 'pointer'
            },
        }}
              onClick={() => navigate(`/songs/${song.code}`)}
        >
            <CardContent sx={{p: 1}}>
                <Typography sx={{fontSize: 12}} color="text.primary" gutterBottom variant={"button"} paragraph>
                    {song.title}
                </Typography>
                {
                    !!song.composers.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            {t('pages.songs.common.composers')}: {join(map(song.composers, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.arrangers.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            {t('pages.songs.common.arrangers')}: {join(map(song.arrangers, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.orchestrators.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            {t('pages.songs.common.orchestrators')}: {join(map(song.orchestrators, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.topics.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            {t('pages.songs.common.topics')}: {join(map(song.topics, 'title'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.instruments.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            {t('pages.songs.common.instruments')}: {join(map(song.instruments, 'title'), ', ')}
                        </Typography>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default SongCard;