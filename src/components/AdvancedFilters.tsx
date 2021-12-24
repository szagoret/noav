import {Autocomplete, Button, Grid, Paper, TextField} from "@mui/material";
import {useFetchSongPropertiesQuery} from "src/services/songApiService";
import {IdTitleType} from "src/types/IdTitleType";
import {IdNameType} from "src/types/IdNameType";
import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {
    resetFilters,
    updateArrangerFilter,
    updateComposerFilter,
    updateInstrumentFilter,
    updateOrchestratorFilter,
    updateTopicFilter,
    updateVocalFilter
} from "src/store/song/songAdvancedFiltersSlice";

const AdvancedFilters = () => {
    const {data} = useFetchSongPropertiesQuery();

    const {
        instruments,
        topics,
        vocals,
        composers,
        arrangers,
        orchestrators
    } = useAppSelector((state => state.songAdvancedFilters));

    const dispatch = useAppDispatch();
    return (
        <Paper elevation={2} sx={{p: 3, mb: 2}}>
            <Grid container spacing={{xs: 3, sm: 2, md:1}}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="instruments-filters"
                        disablePortal
                        value={instruments}
                        multiple
                        onChange={(e: any, values: IdTitleType[] | null) => dispatch(updateInstrumentFilter(values))}
                        options={data?.instruments || []}
                        getOptionLabel={(option: IdTitleType) => option.title}
                        renderInput={(params) => <TextField {...params} size="small" label="Instruments"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="topics-filters"
                        disablePortal
                        value={topics}
                        multiple
                        onChange={(e: any, values: IdTitleType[] | null) => dispatch(updateTopicFilter(values))}
                        options={data?.topics || []}
                        getOptionLabel={(option: IdTitleType) => option.title}
                        renderInput={(params) => <TextField {...params} size="small" label="Topics"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="vocals-filters"
                        disablePortal
                        value={vocals}
                        multiple
                        onChange={(e: any, values: IdTitleType[] | null) => dispatch(updateVocalFilter(values))}
                        options={data?.vocals || []}
                        getOptionLabel={(option: IdTitleType) => option.title}
                        renderInput={(params) => <TextField {...params} size="small" label="Vocals"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="composers-filters"
                        disablePortal
                        multiple
                        value={composers}
                        onChange={(e: any, values: IdNameType[] | null) => dispatch(updateComposerFilter(values))}
                        options={data?.authors || []}
                        getOptionLabel={(option: IdNameType) => option.name}
                        renderInput={(params) => <TextField {...params} size="small" label="Composers"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="arrangers-filters"
                        disablePortal
                        multiple
                        value={arrangers}
                        onChange={(e: any, values: IdNameType[] | null) => dispatch(updateArrangerFilter(values))}
                        options={data?.authors || []}
                        getOptionLabel={(option: IdNameType) => option.name}
                        renderInput={(params) => <TextField {...params} size="small" label="Arrangers"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Autocomplete
                        id="orchestrators-filters"
                        disablePortal
                        multiple
                        value={orchestrators}
                        onChange={(e: any, values: IdNameType[] | null) => dispatch(updateOrchestratorFilter(values))}
                        options={data?.authors || []}
                        getOptionLabel={(option: IdNameType) => option.name}
                        renderInput={(params) => <TextField {...params} size="small" label="Orchestrators"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="text" onClick={() => dispatch(resetFilters())}>Clear</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AdvancedFilters;