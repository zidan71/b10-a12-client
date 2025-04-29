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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EditBiodata from "../Pages/Dashboard/EditBiodata";
import FavouritesBio from "../Pages/Dashboard/FavouritesBio";
import MyContactRequest from "../Pages/Dashboard/MyContactRequest";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata";
import AdminRoute from "../Components/Private/AdminRoute";
import ContactReq from "../Pages/Dashboard/Admin/ContactReq";
import PremiumReq from "../Pages/Dashboard/Admin/PremiumReq";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import GotMarried from "../Pages/Dashboard/GotMarried";

const stripePromise = loadStripe('pk_test_51RH3ITPm0d3rt2zyEpzwQy1OpQOHh3GiUUITDB8ZSs5q2uJMSLukCtd2JPHERPHlecW2TUh6kcJ5WWdBCGELjGjJ00NS71LVRb');


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
          element: <PrivateRoute>
            <Elements stripe={stripePromise}>
            <CheckOut>
              
              </CheckOut>
            </Elements>
            </PrivateRoute>,
        },
        
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // user
        {
          path:'/dashboard/edit-biodata',
          element:<EditBiodata></EditBiodata>
        },
        {
          path:"/dashboard/favourite-biodatas",
          element:<FavouritesBio></FavouritesBio>
        },
        {
          path:'/dashboard/my-contact-requests',
          element:<PrivateRoute><MyContactRequest></MyContactRequest></PrivateRoute>
        },
        {
          path:'/dashboard/view-biodata',
          element:<PrivateRoute><ViewBiodata></ViewBiodata></PrivateRoute>
        },

        {
          path:'/dashboard/got-married',
          element:<PrivateRoute><GotMarried></GotMarried></PrivateRoute>
        },

        // admin

        {
          path:'/dashboard/contact-request',
          element:<PrivateRoute><AdminRoute><ContactReq></ContactReq></AdminRoute></PrivateRoute>
        },
        {
          path:'/dashboard/approve-premium',
          element:<AdminRoute><PremiumReq></PremiumReq></AdminRoute>
        },
        {
          path:'/dashboard/manage-users',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'/dashboard/admin-dashboard',
          element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
        },
       
        
      ]
    },
  ]);

  export default router