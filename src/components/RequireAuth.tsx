import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "src/hooks/reduxHooks";

const RequireAuth = ({children}: { children: JSX.Element }) => {
    const auth = useAppSelector(state => state.auth);
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};

export default RequireAuth;