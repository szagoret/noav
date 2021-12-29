import {useParams} from "react-router-dom";
import {useFetchSongPropertiesQuery, useFindSongByCodeQuery, useSaveSongMutation} from "src/services/songApiService";
import SongViewSkeleton from "src/pages/notes/SongViewSkeleton";
import {IdNameType} from "src/types/IdNameType";
import {IdTitleType} from "src/types/IdTitleType";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Autocomplete, Box, FormControl, Grid, Paper, TextField} from "@mui/material";
import {DevTool} from "@hookform/devtools";
import {LoadingButton} from '@mui/lab';
import SongFilesForm from "src/components/SongFilesForm";
import {useTranslation} from "react-i18next";

interface IFormInput {
    title: string,
    code?: string,
    originalTitle?: string,
    composers: Array<IdNameType>,
    arrangers: Array<IdNameType>,
    orchestrators: Array<IdNameType>,
    topics: Array<IdTitleType>,
    instruments: Array<IdTitleType>,
    vocals: Array<IdTitleType>
}

const SaveSongPage = () => {
    const {t} = useTranslation();
    const {songCode} = useParams();

    const {data: song, isFetching: isSongFetching} = useFindSongByCodeQuery(songCode as string, {skip: !songCode});
    const {data: songProperties, isFetching: isSongPropertiesFetching} = useFetchSongPropertiesQuery();

    const {control, handleSubmit} = useForm<IFormInput>({
        defaultValues: {...song}
    });

    const [saveSong, {isLoading}] = useSaveSongMutation();

    const onSubmit: SubmitHandler<IFormInput> = data => saveSong({...data, code: songCode});

    if (isSongFetching || isSongPropertiesFetching) {
        return (<SongViewSkeleton/>);
    }

    return (
        <>
            <Grid container maxWidth="lg" spacing={1} justifyContent={'space-between'}>
                <Grid item xs={12} md={5} lg={5} sx={{
                    p: 1,
                    m: 1
                }} component={Paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            spacing={3}>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap"
                                >
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={song?.title}
                                        render={({field}) =>
                                            <FormControl>
                                                <TextField
                                                    {...field}
                                                    sx={{minWidth: 400}}
                                                    label={t('pages.songs.common.songTitle')}
                                                    variant="outlined"
                                                />
                                            </FormControl>}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="topics"
                                        control={control}
                                        defaultValue={song?.topics}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.topics || []}
                                                    getOptionLabel={(option) => option.title}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.topics')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="arrangers"
                                        control={control}
                                        defaultValue={song?.arrangers}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.authors || []}
                                                    getOptionLabel={(option) => option.name}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.arrangers')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="composers"
                                        control={control}
                                        defaultValue={song?.composers}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.authors || []}
                                                    getOptionLabel={(option) => option.name}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.composers')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="orchestrators"
                                        control={control}
                                        defaultValue={song?.orchestrators}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.authors || []}
                                                    getOptionLabel={(option) => option.name}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.orchestrators')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="vocals"
                                        control={control}
                                        defaultValue={song?.vocals}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.vocals || []}
                                                    getOptionLabel={(option) => option.title}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.vocals')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap">
                                    <Controller
                                        name="instruments"
                                        control={control}
                                        defaultValue={song?.instruments}
                                        render={({field: {onChange, value}}) =>
                                            (<FormControl>
                                                <Autocomplete
                                                    onChange={(event, item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value}
                                                    multiple
                                                    options={songProperties?.instruments || []}
                                                    getOptionLabel={(option) => option.title}
                                                    isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                                                    filterSelectedOptions
                                                    sx={{minWidth: 400}}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={t('pages.songs.common.instruments')}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </FormControl>)}
                                    />
                                    <Box flexGrow={1}/>
                                </Box>
                            </Grid>
                        </Grid>
                        <LoadingButton loading={isLoading}
                                       variant="outlined"
                                       sx={{mt: 2}}
                                       onClick={handleSubmit(onSubmit)}>
                            {t('common.save')}
                        </LoadingButton>
                    </form>
                    <DevTool control={control}/>
                </Grid>
                {
                    song?.code &&
                    <Grid item xs={12} md={5} lg={5} sx={{
                        p: 1,
                        m: 1
                    }} component={Paper}>
                        <SongFilesForm songCode={song?.code}/>
                    </Grid>
                }
            </Grid>


        </>
    );
};

export default SaveSongPage;