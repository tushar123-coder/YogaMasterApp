import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

export const router=createBrowserRouter([
{
    path:"/",
    element:<MainLayout/>,
    children:[
        {
        path:'/',
        element:<Home/> 
        },
        {
            path:'instructors',
            element:<Instructors/>
        },
        {
            path:'classes',
            element:<Classes/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>

        }
    ]
},

]);
