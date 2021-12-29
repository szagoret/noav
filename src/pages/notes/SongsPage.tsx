import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {useAdvancedSongSearchQuery} from "src/services/songApiService";
import {map} from "lodash";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import AdvancedFilters from "src/components/AdvancedFilters";
import {
    setPageSizeFilter,
    setSortFieldFilter,
    toggleSortDirection,
    toggleViewMode
} from "src/store/song/songAdvancedFiltersSlice";
import ListIcon from "@mui/icons-material/List";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useTranslation} from "react-i18next";
import SongsGridView from "src/pages/notes/SongsGridView";
import SongsListView from "src/pages/notes/SongsListView";

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
    const {t} = useTranslation();
    return (
        <Box>
            <Typography>
            </Typography>
            <AdvancedFilters/>
            <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center', flexWrap: 'wrap'}}>
                <FormControl size={"small"} sx={{width: 200, m: 1}}>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortField}
                            label={t('pages.songs.toolbar.sortBy')}
                            onChange={(event: SelectChangeEvent) => dispatch(setSortFieldFilter(event.target.value))}>
                        <MenuItem value={"title"}>{t('pages.songs.toolbar.title')}</MenuItem>
                        <MenuItem value={"publishDate"}>{t('pages.songs.toolbar.publishDate')}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size={"small"} sx={{width: 100, m: 1}}>
                    <InputLabel id="demo-simple-select-label">Page size</InputLabel>
                    <Select labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={((size || 25).toString())}
                            label={t('pages.songs.toolbar.pageSize')}
                            onChange={(event: SelectChangeEvent) => dispatch(setPageSizeFilter(event.target.value))}>
                        <MenuItem value={25}>25</MenuItem>
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
                data && (viewMode === 'grid' ?
                    <SongsGridView data={data} loading={isFetching}/>
                    : <SongsListView data={data} loading={isFetching}/>)
            }
        </Box>
    );
}

export default SongsPage;