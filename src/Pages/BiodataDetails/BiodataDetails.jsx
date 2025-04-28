import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import useAuth from '../../Components/Hooks/UseAuth';

const BiodataDetails = () => {
    const biodata = useLoaderData();
    const {user} = useAuth()

    const { data: myRequests = [] } = useQuery({
        queryKey: ['myContactRequests', user?.email],
        queryFn: async () => {
          if (!user?.email) return [];
          const res = await axios.get(`http://localhost:5000/contact-requests/${user.email}`);
          return res.data;
        },
        enabled: !!user?.email, // Only run if user exists
      });

      const hasApprovedRequest = myRequests.some(
        (request) => request.biodataId == biodata.biodataId && request.status === 'approved'
      );

      const isPremium = biodata?.premiumStatus; // Assuming you have premiumStatus field inside biodata

      const canSeeContactInfo = isPremium || hasApprovedRequest;



    const { biodataType, _id ,contactEmail,mobileNumber } = biodata;

    const { data: allBiodatas = [], isLoading } = useQuery({
        queryKey: ['allBiodatas'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/biodatas');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }


    const handleAddToFavourites = async () => {
        const favouriteData = {
            biodataId: biodata.biodataId,
            userEmail: biodata.email || "example@example.com", // (replace with actual logged user email later)
            biodataType: biodata.biodataType,
            profileImage: biodata.profileImage,
            division: biodata.permanentDivision,
            age: biodata.age,
            occupation: biodata.occupation
        };

        try {
            const res = await axios.post('http://localhost:5000/favourites', favouriteData);
            if (res.data.insertedId) {
                toast.success("Added succefully")
            }
        } catch (error) {
            console.error(error);
            message.error('Something went wrong!');
        }
    };



    // Filter similar biodatas (same biodataType and NOT the current biodata itself)
    const similarBiodatas = allBiodatas
        .filter(bio => bio.biodataType === biodataType && bio._id !== _id)
        .slice(0, 3); // Max 3 biodatas



        


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 md:p-10">
            {/* Details Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-10">
                <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">Biodata Details</h1>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={biodata.profileImage} alt="Profile" className="w-48 h-48 rounded-full object-cover" />
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">Type:</span> {biodata.biodataType}</p>
                        <p><span className="font-semibold">Biodata ID:</span> {biodata.biodataId}</p>
                        <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
                        <p><span className="font-semibold">Age:</span> {biodata.age}</p>
                        <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>


                    {
                        canSeeContactInfo ? <>
                        <p>Email : {contactEmail}</p>
                        <p>Number : {mobileNumber}</p>
                        </> : <>
                        <p className='text-pink-600 font-medium mb-4'> Contact Information is hidden. Request access to see Email and Mobile Number</p>
                        </>
                    }


                        <div className='flex gap-x-3'>
                            <button
                                onClick={handleAddToFavourites}
                                className="mt-6 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition"
                            >
                                Add to Favourites
                            </button>

                            <Link to={`/checkout/${biodata._id}?biodataId=${biodata.biodataId}`}>
                                <button
                                    className="mt-6 cursor-pointer bg-green-700 hover:bg-green-600 text-white py-2 px-6 rounded-full transition"
                                >
                                    Request Contact Info
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Biodatas Section */}
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Similar {biodataType} Biodatas</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarBiodatas.map(bio => (
                        <div key={bio._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img src={bio.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-700">{bio.biodataType}</p>
                                <p className="text-gray-600">Division: {bio.permanentDivision}</p>
                                <p className="text-gray-600">Age: {bio.age}</p>
                                <p className="text-gray-600">Occupation: {bio.occupation}</p>
                            </div>
                            <Link to={`/biodata/${bio._id}`} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition">
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
