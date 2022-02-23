import * as React from "react";
import {useAppSelector} from "src/hooks/reduxHooks";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

const LoginButton = () => {
    const {t} = useTranslation();
    const auth = useAppSelector(state => state.auth);

    return (
        <>
            {!auth.user && <Button href="/login" color={'info'}>{t('auth.login')}</Button>}
        </>
    );
};

export default LoginButton;