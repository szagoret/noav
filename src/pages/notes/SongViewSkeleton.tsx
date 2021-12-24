import {Box, Container, Fade, Grid, Skeleton} from '@mui/material';
import React from 'react';

export default () => {
    return (
        <Fade in>
            <Container maxWidth="xl">
                <Box mt={6}>
                    <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Skeleton variant="rectangular" height={400}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rectangular" height={400}/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fade>
    );
};
