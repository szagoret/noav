import {Box, Container, FormControl, Grid, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {LoginRequest, useLoginMutation} from "src/services/authApiService";
import {useAppDispatch} from "src/hooks/reduxHooks";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {setCredentials} from "src/store/auth/authSlice";
import {LoadingButton} from "@mui/lab";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {control, handleSubmit} = useForm<LoginRequest>({
        defaultValues: {}
    });

    const onSubmit: SubmitHandler<LoginRequest> = data => {
        login({...data}).unwrap().then(payload => {
            if (payload.jwt) {
                dispatch(setCredentials({user: {username: payload.username}, token: payload.jwt}))
                navigate(`/`);
            }
        }).catch(error => {
            toast.error('Login failed', {
                position: "bottom-center",
                autoClose: 3000,
                closeOnClick: true,
                progress: undefined
            });
        });
    };

    return (
        <Container>
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
                                name="username"
                                control={control}
                                render={({field}) =>
                                    <FormControl>
                                        <TextField
                                            {...field}
                                            sx={{minWidth: 100}}
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
                            flexWrap="wrap"
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) =>
                                    <FormControl>
                                        <TextField
                                            {...field}
                                            sx={{minWidth: 100}}
                                            type={'password'}
                                            variant="outlined"
                                        />
                                    </FormControl>}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <LoadingButton loading={isLoading}
                               variant="outlined"
                               sx={{mt: 2}}
                               onClick={handleSubmit(onSubmit)}>
                    {'Login'}
                </LoadingButton>
            </form>
        </Container>
    );
};

export default LoginPage;