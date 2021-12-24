import {Card, Grid, Skeleton} from "@mui/material";
import {range} from 'lodash';

const SongsPageGridSkeleton = () => {
    return (
        <>
            {
                range(12).map(e => (
                    <Grid item key={e} xs={12} md={4} lg={3}>
                        <Card variant="outlined" sx={{height: '180px'}}>
                            <Skeleton variant="rectangular"/>
                        </Card>
                    </Grid>
                ))
            }
        </>
    );
};

export default SongsPageGridSkeleton;

