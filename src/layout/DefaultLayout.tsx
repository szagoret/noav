import {Outlet} from "react-router-dom";
import TopBar from "src/components/topbar/TopBar";
import React from "react";
import {Box, Container, Divider} from "@mui/material";
import {useTranslation} from "react-i18next";
import LoginButton from "src/components/auth/LoginButton";

const DefaultLayout = () => {

    const {t} = useTranslation();
    return (
        <Box sx={{backgroundColor: '#f4f6f8'}}>
            <TopBar/>
            <Container sx={{minHeight: '400px', pt: 3, mb: 3}} maxWidth={"xl"} component={'main'}>
                <Outlet/>
            </Container>
            <Container maxWidth={"xl"} component={'footer'}>
                <Divider/>
                <Box sx={{p: 1, display: 'flex', justifyContent: 'space-between'}}>
                    {t('brandTitle')}{' '}{'2022'}
                    <LoginButton/>
                </Box>
            </Container>
        </Box>
    );

};

export default DefaultLayout;