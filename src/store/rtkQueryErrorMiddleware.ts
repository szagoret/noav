import {isRejectedWithValue, Middleware, MiddlewareAPI,} from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import {ApiCommonErrorMessages} from "src/error/ApiCommonErrorMessages";
import i18next from "i18next";


export const rtkQueryErrorMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            let msg: string;
            if (action?.payload?.data in ApiCommonErrorMessages) {
                msg = i18next.t(`common.errors.${action.payload.data}`);
            } else {
                msg = i18next.t(`common.errors.${ApiCommonErrorMessages.generic_error}`);
            }
            toast.error(msg, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
        return next(action)
    }