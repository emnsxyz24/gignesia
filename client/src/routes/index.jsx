import {createBrowserRouter} from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/Error-pages";
import LandingPageNonUser from "../pages/LandingPageNonUser";
import LandingPageUser from "../pages/LandingPageUser";
import About from "../pages/About";


export const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>
    },
    {
      path: "/",
      element: <LandingPageNonUser/>,
      errorElement: <ErrorPage/>  
    },
    {
        path: "/about",
        element: <About/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/user",
        element: <LandingPageUser/>, 
        errorElement: <ErrorPage/>
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <ErrorPage/>
    }
])  
