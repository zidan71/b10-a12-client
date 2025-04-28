import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'antd';
import useAuth from '../../Components/Hooks/UseAuth';
import useAdmin from '../../Components/Hooks/useAdmin';

const Dashboard = () => {

    const [isAdmin, isAdminLoading] = useAdmin();


    const { logOut } = useAuth()


    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-2xl rounded-r-3xl p-6 flex flex-col  justify-between">
                <div className=''>
                    <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">Dashboard</h2>

                    <ul className="space-y-4">
                        {
                            isAdmin ? <>
                                <li><Link to="/dashboard/admin-home">Admin Home</Link></li>
               <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
          <li><Link to="/dashboard/approve-premium">Approve Premium Requests</Link></li>
                            </> : <>
                                <li>
                                    <Link
                                        to="/dashboard/edit-biodata"
                                        className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    >
                                        ✏️ Edit Biodata
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/view-biodata"
                                        className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    >
                                        📄 View Biodata
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/my-contact-requests"
                                        className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    >
                                        📞 My Contact Requests
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/favourite-biodatas"
                                        className="block text-lg font-medium text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-full transition"
                                    >
                                        💖 Favourites Biodata
                                    </Link>
                                </li>
                            </>
                        }

                    </ul>
                </div>

                {/* Logout Button */}
                <div className="mt-10 ">
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

            {/* Main Content Area */}
            <div className="flex-1 p-10">

                <h1 className='text-center text-2xl font-bold text-violet-700'>Welcome To Dashboard</h1>

                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;


// import useAdmin from '../../Components/Hooks/useAdmin';

// const Dashboard = () => {
//   const [isAdmin, isAdminLoading] = useAdmin();

//   if (isAdminLoading) {
//     return <div>Loading...</div>; // or your spinner
//   }

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-64 p-6 bg-white shadow-2xl">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//         <ul className="space-y-4">
//           {isAdmin ? (
//             <>
//               {/* Admin Links */}
//               <li><Link to="/dashboard/admin-home">Admin Home</Link></li>
//               <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
//               <li><Link to="/dashboard/approve-premium">Approve Premium Requests</Link></li>
//             </>
//           ) : (
//             <>
//               {/* Normal User Links */}
//               <li><Link to="/dashboard/view-biodata">View Biodata</Link></li>
//               <li><Link to="/dashboard/edit-biodata">Edit Biodata</Link></li>
//               <li><Link to="/dashboard/my-favourites">My Favourites</Link></li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

