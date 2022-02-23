import {useFindSongByCodeQuery, useRemoveSongMutation} from "src/services/songApiService";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import SongViewSkeleton from "src/pages/notes/SongViewSkeleton";
import SongCoverImage from "src/components/SongCoverImage";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import {join, map} from "lodash";
import DownloadIcon from '@mui/icons-material/Download';
import bytesToSize from "src/utils/bytesToSize";
import SongFileIcon from "src/components/SongFileIcon";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import RequireAuth from "src/components/auth/RequireAuth";

const SongPage = () => {
    const {t} = useTranslation();
    const {songCode} = useParams();
    const {data, isFetching} = useFindSongByCodeQuery(songCode as string, {skip: !songCode});
    const [removeSong, {isLoading: isDeleting}] = useRemoveSongMutation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpenRemoveDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    if (isFetching) {
        return (<SongViewSkeleton/>);
    }
    return (
        <Container maxWidth="xl">
            <Box mt={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6} lg={6}>
                        <Paper elevation={0}
                               sx={{
                                   padding: (theme) => theme.spacing(1),
                                   textAlign: 'center',
                                   color: (theme) => theme.palette.text.secondary,
                                   whiteSpace: 'nowrap',
                                   mb: 2
                               }}>
                            <Typography color="textSecondary" gutterBottom>
                                {data?.title}
                            </Typography>
                            <Divider/>
                            <SongCoverImage song={data}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6} lg={5}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Instruments
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.instruments, 'title'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Vocals
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.vocals, 'title'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Composers
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.composers, 'name'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Arrangers
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.arrangers, 'name'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Orchestrators
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.orchestrators, 'name'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Topics
                                        </TableCell>
                                        <TableCell align="right">
                                            {join(map(data?.topics, 'title'), ', ')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <List
                            component={Paper}
                            elevation={0}
                            sx={{
                                mt: 1,
                                mb: 2,
                                color: (theme) => theme.palette.text.secondary,
                                whiteSpace: 'nowrap'
                            }}>
                            {data?.files?.map(({name, extension, code, size,}) => (
                                <ListItem key={name}
                                          secondaryAction={
                                              <IconButton edge="end" aria-label="download"
                                                          href={`${process.env.REACT_APP_API_BASE_URL}/api/song/${data?.code}/files/download/${code}/${name}`}
                                                          target="_blank"
                                                          rel="noopener noreferrer">
                                                  <DownloadIcon/>
                                              </IconButton>
                                          }
                                          sx={{display: 'flex'}}>
                                    <ListItemIcon>
                                        <SongFileIcon extension={extension}/>
                                    </ListItemIcon>
                                    <ListItemText primary={name}
                                                  secondary={size && bytesToSize(size)}
                                                  primaryTypographyProps={{whiteSpace: 'break-spaces'}}/>
                                </ListItem>
                            ))}
                        </List>
                        <RequireAuth>
                            <Paper>
                                <List
                                    subheader={(
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Actions
                                        </ListSubheader>
                                    )}>
                                    <ListItem>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component={RouterLink}
                                            to="/songs/new"
                                            startIcon={<AddIcon/>}
                                        >
                                            {t('common.edit')}
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component={RouterLink}
                                            to={`/songs/edit/${data?.code}`}
                                            startIcon={<EditIcon/>}
                                        >
                                            {t('common.edit')}
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            onClick={handleOpenRemoveDialog}
                                            startIcon={<DeleteIcon/>}
                                        >
                                            {t('common.delete')}
                                        </Button>
                                    </ListItem>
                                </List>
                            </Paper>
                        </RequireAuth>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('common.deleteConfirmation')}
                        <br/>
                        <Typography variant={'h6'} component="span">
                            {data?.title}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !!songCode &&
                        <Button onClick={() => {
                            removeSong({songCode}).finally(() => navigate("/"));
                        }} color="primary" disabled={isDeleting}>
                            {t('common.yes')}
                        </Button>
                    }

                    <Button onClick={handleClose} color="primary" autoFocus>
                        {t('common.no')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default SongPage;