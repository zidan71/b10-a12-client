import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import useAuth from '../../Components/Hooks/UseAuth';
import useAdmin from '../../Components/Hooks/useAdmin';
import Navbar from '../../Components/Navbar/Navbar';
import Footers from '../../Components/Footer/Footers';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { logOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const sidebarContent = (
        <div className='h-full'>
            <div className=''>
                <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">Dashboard</h2>

                <ul className="space-y-4">
                    {isAdmin ? (
                        <>
                            <li><Link to="/dashboard/admin-dashboard" className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link></li>
                            <li><Link to="/dashboard/manage-users" className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition" onClick={() => setMobileMenuOpen(false)}>Manage Users</Link></li>
                            <li><Link to="/dashboard/approve-premium" className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition" onClick={() => setMobileMenuOpen(false)}>Approve Premium</Link></li>
                            <li><Link to="/dashboard/contact-request" className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition" onClick={() => setMobileMenuOpen(false)}>Approve Contact Request</Link></li>
                            <li><Link to="/dashboard/admin-success" className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition" onClick={() => setMobileMenuOpen(false)}>Success Story</Link></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/dashboard/edit-biodata"
                                    className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    ✏️ Edit Biodata
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard/view-biodata"
                                    className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    📄 View Biodata
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard/my-contact-requests"
                                    className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    📞 My Contact Requests
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard/favourite-biodatas"
                                    className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    💖 Favourites Biodata
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard/got-married"
                                    className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    💑 Got Married
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Logout Button */}
            <div className="mt-10">
                <Button
                    onClick={logOut}
                    type="primary"
                    danger
                    block
                    className="rounded-full bg-red-500 hover:bg-red-600"
                >
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Navbar></Navbar>

            <div className='bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'>
                <div className="min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row">
                    {/* Mobile Menu Button - Only visible on small screens */}
                    <div className="lg:hidden p-4 flex justify-between items-center bg-white shadow-md">
                        <h2 className="text-xl font-bold text-purple-700">Dashboard</h2>
                        <Button
                            icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                            onClick={toggleMobileMenu}
                            type="text"
                        />
                    </div>

                   
                    <Drawer
                        title="Dashboard Menu"
                        placement="left"
                        closable={true}
                        onClose={toggleMobileMenu}
                        open={mobileMenuOpen}
                        width={280}
                        bodyStyle={{ padding: 0 }}
                    >
                        {sidebarContent}
                    </Drawer>

                   
                    <div className="hidden lg:block w-64 bg-white shadow-2xl rounded-r-3xl p-6 flex flex-col justify-between">
                        {sidebarContent}
                    </div>

                  
                    <div className="flex-1 p-4 lg:p-10">
                        <h1 className='text-center text-2xl font-bold text-violet-700 mb-6 lg:mb-10'>Welcome To Dashboard</h1>
                        <Outlet />
                    </div>
                </div>
                <Footers></Footers>
            </div>
        </>
    );
};

export default Dashboard;