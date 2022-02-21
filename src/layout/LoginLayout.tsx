import {Outlet} from "react-router-dom";
import TopBar from "src/components/topbar/TopBar";
import React from "react";
import {Box, Container} from "@mui/material";

const DefaultLayout = () => {


    return (
        <Box sx={{backgroundColor: '#f4f6f8'}}>
            <Container sx={{minHeight: '400px', pt: 3, mb: 3}} maxWidth={"xl"}>
                <Outlet/>
            </Container>
        </Box>
    );

};

export default DefaultLayout;