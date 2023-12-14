import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {
    const location = useLocation();
    const notHeaderFooter = location.pathname.includes('login') || location.pathname.includes('regester');
    return (
        <div>
            { notHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            { notHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;