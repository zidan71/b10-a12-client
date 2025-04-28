import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footers';

const Home = () => {
    return (
        <div>
            <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;