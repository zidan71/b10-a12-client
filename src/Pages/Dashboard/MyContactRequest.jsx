import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../Components/Hooks/UseAuth';

const MyContactRequest = () => {
  const { user } = useAuth()

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['myContactRequests', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/contact-requests/${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-20 text-xl">Loading your requests...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">My Contact Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {requests.map(request => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-6">
            <p><strong>Biodata ID:</strong> {request.biodataId}</p>
            <p><strong>Status:</strong> 
              {request.status === 'pending' ? (
                <span className="text-yellow-500 font-semibold ml-2">Pending</span>
              ) : (
                <span className="text-green-600 font-semibold ml-2">Approved</span>
              )}
            </p>
            <p className="text-gray-500 text-sm mt-2">Requested on: {new Date(request.requestDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContactRequest;
