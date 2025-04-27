import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RootLayout from '../Pages/Root/RootLayout'
import Home from "../Pages/Home/Home";

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <RootLayout></RootLayout> ,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
      ]
    },
  ]);

  export default router