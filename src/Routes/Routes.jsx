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
  ]);

  export default router