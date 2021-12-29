import {SongType} from "src/types/SongType";
import {PaginatedResultType} from "src/types/PaginatedResultType";
import {Box, Grid, Pagination} from "@mui/material";
import SongsPageGridSkeleton from "src/pages/notes/SongsPageGridSkeleton";
import SongCard from "src/components/SongCard";
import React from "react";
import {setPageFilter} from "src/store/song/songAdvancedFiltersSlice";
import {useAppDispatch} from "src/hooks/reduxHooks";

interface SongsGridViewProps {
    data?: PaginatedResultType<SongType>,
    loading: boolean
}

const SongsGridView = ({data, loading}: SongsGridViewProps) => {
    const dispatch = useAppDispatch();
    return (
        <>
            {
                loading && (
                    <Grid container spacing={1} sx={{pb: 2, pt: 2}}>
                        <SongsPageGridSkeleton/>
                    </Grid>)
            }
            <Grid container spacing={1} sx={{pb: 2, pt: 2}}>
                {data?.content?.map((song, i) => (
                    <Grid item key={i} xs={12} md={4} lg={3}>
                        <SongCard song={song}/>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', p: 2}}>
                <Pagination count={data?.totalPages}
                            onChange={(event: React.ChangeEvent<unknown>, pageNumber: number) => dispatch(setPageFilter(pageNumber - 1))}/>
            </Box>
        </>
    );
};

export default SongsGridView;