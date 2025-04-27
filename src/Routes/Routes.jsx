import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RootLayout from '../Pages/Root/RootLayout'
import Home from "../Pages/Home/Home";
import BioData from "../Pages/BioData/BioData";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import PrivateRoute from "../Components/Private/PrivateRoute";
import CheckOut from "../Pages/CheckOut/CheckOut";

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
        {
          path:'/biodata',
          element:<BioData></BioData>
        },
        {
          path:'/biodata/:id',
          element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/biodatas/${params.id}`)
        },
        {
          path:'/checkout/:id',
          element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
        },
      ]
    },
  ]);

  export default router