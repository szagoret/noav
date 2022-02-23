import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline, ThemeProvider} from "@mui/material";
import App from 'src/App';
import theme from "src/theme/theme";
import reportWebVitals from "src/reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {persistor, store} from "src/store/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <App/>
                        <ToastContainer/>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
