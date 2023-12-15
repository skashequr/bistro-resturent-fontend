import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Regester from "../pages/Regester/Regester";
import Dashbord from "../components/DashBord/Dashbord";
import Card from "../components/DashBord/Card";
import AddItems from "../components/DashBord/AddItems";
import AllUsers from "../components/DashBord/AllUsers/AllUsers";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'regester',
          element: <Regester></Regester>
        }
      ],
    },
    {
      path: 'dashbord',
      element: <Dashbord></Dashbord>,
      children: [
        {
          path: 'cart',
          element: <Card></Card>
        },
        {
          path: 'add items',
          element: <AddItems></AddItems>
        },
        //Admin routs
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        }
      ]
    }
  ]);