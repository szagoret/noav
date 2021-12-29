import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import SongAutoSuggest from "src/components/topbar/SongAutoSuggest";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import {useTranslation} from "react-i18next";

const TopBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const {t} = useTranslation();
    const pages = [t('pages.songs.title'), t('pages.learning.title'), t('pages.photos.title')];
    const navigate = useNavigate();

    const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2, display: {xs: 'block', md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Button component={RouterLink} sx={{
                        color: '#fff',
                        flexGrow: 1, whiteSpace: 'nowrap', mr: 1, display: {
                            xs: 'none',
                            md: 'block'
                        }
                    }} to="/">
                        {t('brandTitle')}
                    </Button>
                    <Grid container sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Grid item xs={12} md={6} lg={4}>
                            <SongAutoSuggest/>
                        </Grid>
                    </Grid>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                // onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', flexGrow: 1, display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ml: 2}}
                        onClick={() => navigate("/admin")}>
                        <SettingsIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <List>
                        <ListItem button component={RouterLink} to={'/'}>
                            <ListItemText primary={t('brandTitle')}/>
                        </ListItem>
                        <Divider/>
                        {pages.map((text, index) => (
                            <ListItem button key={`${text}-${index}`}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default TopBar;