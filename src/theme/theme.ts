import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {

    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
    }
}

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#1976d2',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        }
    },
});

export default theme;