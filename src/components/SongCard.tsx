import {Card, CardContent, Typography} from "@mui/material";
import {SongType} from "src/types/SongType";
import {join, map} from 'lodash';
import {useNavigate} from "react-router-dom";

interface SongCardProps {
    song: SongType
}

const SongCard = ({song}: SongCardProps) => {
    const navigate = useNavigate();
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
                            Composers: {join(map(song.composers, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.arrangers.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            Arrangers: {join(map(song.arrangers, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.orchestrators.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            Orchestrators: {join(map(song.orchestrators, 'name'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.topics.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            Topics: {join(map(song.topics, 'title'), ', ')}
                        </Typography>
                    )
                }
                {
                    !!song.instruments.length && (
                        <Typography sx={{fontSize: 12, mb: 0}} color="text.secondary" variant={"subtitle2"} paragraph>
                            Instruments: {join(map(song.instruments, 'title'), ', ')}
                        </Typography>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default SongCard;