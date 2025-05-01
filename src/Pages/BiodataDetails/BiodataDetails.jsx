import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';
import { Spin, message } from 'antd';
import { toast } from 'react-toastify';
import useAuth from '../../Components/Hooks/UseAuth';

const BiodataDetails = () => {
    const biodata = useLoaderData();
    const { user } = useAuth();

    const { biodataType, _id, contactEmail, mobileNumber } = biodata;

  
    const { data: allBiodatas = [], isLoading } = useQuery({
        queryKey: ['allBiodatas'],
        queryFn: async () => {
            const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/biodatas');
            return res.data;
        }
    });

 
    const { data: loggedUser = {} } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://assignment-12-server-zeta-three.vercel.app/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const isUserPremium = loggedUser?.role === 'premium';

    
    const { data: myRequests = [] } = useQuery({
        queryKey: ['myContactRequests', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://assignment-12-server-zeta-three.vercel.app/contact-requests/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const hasApprovedRequest = myRequests.some(
        (request) => parseInt(request.biodataId) === biodata.biodataId && request.status === 'approved'
      );

    const canSeeContactInfo = isUserPremium || hasApprovedRequest;

    const handleAddToFavourites = async () => {
        const favouriteData = {
            name:biodata.name,
            biodataId: biodata.biodataId,
            userEmail: user.email,
            biodataType: biodata.biodataType,
            profileImage: biodata.profileImage,
            division: biodata.permanentDivision,
            age: biodata.age,
            occupation: biodata.occupation
        };

        try {
            const res = await axios.post('https://assignment-12-server-zeta-three.vercel.app/favourites', favouriteData);
            if (res.data.insertedId) {
                toast.success("Added to favourites!");
            } else {
                toast.info("Already in favourites.");
            }
        } catch (error) {
            
            toast.error('Something went wrong!');
        }
    };

    const similarBiodatas = allBiodatas
        .filter(bio => bio.biodataType === biodataType && bio._id !== _id)
        .slice(0, 3);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 md:p-10">
         
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-10">
  <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">Biodata Details</h1>

  <div className="flex flex-col md:flex-row items-center gap-6">
    <img
      src={biodata.profileImage}
      alt="Profile"
      className="w-48 h-full rounded-3xl object-cover"
    />

<div className="w-full text-gray-700">
  <p className="text-3xl font-bold text-purple-700 text-center md:text-left mb-4">{biodata.name}</p>

 
  {isUserPremium && (
    <div className="mb-4">
      <span className="inline-block bg-yellow-400 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full shadow">
        ⭐ Premium Member
      </span>
    </div>
  )}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <p><strong>🧷 Name:</strong> {biodata.name}</p>
    <p><strong>🆔 Biodata ID:</strong> {biodata.biodataId}</p>
    <p><strong>👤 Type:</strong> {biodata.biodataType}</p>

    <p><strong>📅 Date of Birth:</strong> {biodata.dateOfBirth}</p>
    <p><strong>📏 Height:</strong> {biodata.height}</p>

    <p><strong>⚖️ Weight:</strong> {biodata.weight}</p>
    <p><strong>🎂 Age:</strong> {biodata.age}</p>

    <p><strong>💼 Occupation:</strong> {biodata.occupation}</p>
    <p><strong>🎨 Race:</strong> {biodata.race}</p>

    <p><strong>👨 Father's Name:</strong> {biodata.fatherName}</p>
    <p><strong>👩 Mother's Name:</strong> {biodata.motherName}</p>

    <p><strong>🏠 Permanent Division:</strong> {biodata.permanentDivision}</p>
    <p><strong>📍 Present Division:</strong> {biodata.presentDivision}</p>

    <p><strong>💑 Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
    <p><strong>📐 Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>

    <p><strong>⚖️ Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>

    {canSeeContactInfo ? (
      <>
        <p><strong>📧 Email:</strong> {contactEmail}</p>
        <p><strong>📱 Mobile:</strong> {mobileNumber}</p>
      </>
    ) : (
      <p className="text-pink-600 font-medium col-span-2">
        🚫 Contact info hidden — Request access to view
      </p>
    )}
  </div>


  <div className="flex gap-3 flex-wrap justify-center md:justify-start mt-6">
    <button
      onClick={handleAddToFavourites}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition"
    >
      ❤️ Add to Favourites
    </button>

    {!canSeeContactInfo && (
      <Link to={`/checkout/${biodata._id}?biodataId=${biodata.biodataId} `} state={{
        name: biodata.name,
        email: biodata.contactEmail,
        mobile: biodata.mobileNumber,
      }}>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition">
          🔓 Request Contact Info
        </button>
      </Link>
    )}
  </div>
</div>

  </div>
</div>


          
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Similar {biodataType} Biodatas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarBiodatas.map(bio => (
                        <div key={bio._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img src={bio.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
                            <div className="text-center">
                                <p className="text-lg font-bold text-purple-700">{bio.name}</p>
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
