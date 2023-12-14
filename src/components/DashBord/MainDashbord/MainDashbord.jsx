import { Outlet } from "react-router-dom";
import Dashbord from "../Dashbord";


const MainDashbord = () => {
    return (
        <div>
            <Dashbord></Dashbord>
            <Outlet></Outlet>
        </div>
    );
};

export default MainDashbord;