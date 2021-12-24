import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {useAdvancedSongSearchQuery} from "src/services/songApiService";
import {map} from "lodash";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import AdvancedFilters from "src/components/AdvancedFilters";
import {
    setPageFilter,
    setPageSizeFilter,
    setSortFieldFilter,
    toggleSortDirection,
    toggleViewMode
} from "src/store/song/songAdvancedFiltersSlice";
import ListIcon from "@mui/icons-material/List";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SongCard from "src/components/SongCard";
import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SongsPageGridSkeleton from "src/pages/notes/SongsPageGridSkeleton";

const SongsPage = () => {
    const {
        sortDirection,
        sortField,
        viewMode,
        page,
        size,
        instruments,
        topics,
        vocals,
        composers,
        arrangers,
        orchestrators
    } = useAppSelector((state => state.songAdvancedFilters));

    const {data, isFetching} = useAdvancedSongSearchQuery({
        instrumentsIds: map(instruments, 'id'),
        composersIds: map(composers, 'id'),
        topicsIds: map(topics, 'id'),
        vocalsIds: map(vocals, 'id'),
        arrangersIds: map(arrangers, 'id'),
        orchestratorsIds: map(orchestrators, 'id'),
        page,
        size,
        sort: `${sortField},${sortDirection}`
    });
    const dispatch = useAppDispatch();

    return (
        <Box>
            <AdvancedFilters/>
            <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center', flexWrap: 'wrap'}}>
                <FormControl size={"small"} sx={{width: 200, m: 1}}>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortField}
                            label="Sort By"
                            onChange={(event: SelectChangeEvent) => dispatch(setSortFieldFilter(event.target.value))}>
                        <MenuItem value={"title"}>Title</MenuItem>
                        <MenuItem value={"publishDate"}>Publication date</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size={"small"} sx={{width: 100, m: 1}}>
                    <InputLabel id="demo-simple-select-label">Page size</InputLabel>
                    <Select labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={((size || 20).toString())}
                            label="Page size"
                            onChange={(event: SelectChangeEvent) => dispatch(setPageSizeFilter(event.target.value))}>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{m: 1}}>
                    <ToggleButton onChange={() => dispatch(toggleSortDirection())}
                                  value="sorted"
                                  size="small">
                        {sortDirection === "ASC" ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                    </ToggleButton>
                </Box>

                <ToggleButtonGroup
                    exclusive
                    onChange={() => dispatch(toggleViewMode())}
                    size="small"
                    sx={{m: 1}}
                    value={viewMode}>
                    <ToggleButton value="list">
                        <ListIcon/>
                    </ToggleButton>
                    <ToggleButton value="grid">
                        <ViewModuleIcon/>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {
                isFetching && (
                    <Grid container spacing={1} sx={{pb: 2, pt: 2}}>
                        <SongsPageGridSkeleton/>
                    </Grid>)
            }
            <Grid container spacing={1} sx={{pb: 2, pt: 2}}>
                {data?.content.map((song, i) => (
                    <Grid item key={i} xs={12} md={4} lg={3}>
                        <SongCard song={song}/>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', p: 2}}>
                <Pagination count={data?.totalPages || 1}
                            onChange={(event: React.ChangeEvent<unknown>, pageNumber: number) => dispatch(setPageFilter(pageNumber - 1))}/>
            </Box>
        </Box>
    )
        ;
}

export default SongsPage;