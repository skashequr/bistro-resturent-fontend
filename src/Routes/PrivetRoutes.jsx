import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContex } from "../AuthProvider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, lodder} = useContext(AuthContex);
    const location = useLocation();

    if(lodder){
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;