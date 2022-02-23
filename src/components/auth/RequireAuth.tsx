import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "src/hooks/reduxHooks";

const RequireAuth = ({children, redirect = false}: { children: JSX.Element, redirect?: boolean }) => {
    const auth = useAppSelector(state => state.auth);
    let location = useLocation();

    if (!auth.user) {
        if (redirect) {
            return <Navigate to="/login" state={{from: location}} replace/>;
        } else {
            return <noscript/>
        }
    }

    return children;
};

export default RequireAuth;