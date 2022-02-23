import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {logout} from "src/store/auth/authSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    return (
        <>
            {auth.user && <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ml: 2}}
                onClick={() => {
                    dispatch(logout());
                    navigate("/");
                }}>
                <ExitToAppIcon/>
            </IconButton>}
        </>
    );
};

export default LogoutButton;