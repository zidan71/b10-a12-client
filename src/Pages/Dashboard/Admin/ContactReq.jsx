import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Button, message } from 'antd';

const ContactReq = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['manageContactRequests'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/contact-requests`);
      return res.data;
    }
  });

  const approveRequest = useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(`http://localhost:5000/contact-requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      message.success('Request approved successfully!');
      queryClient.invalidateQueries(['manageContactRequests']);
    }
  });

  if (isLoading) return <div className="text-center py-20 text-xl">Loading all contact requests...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Manage Contact Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {requests.map(request => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-6">
            <p><strong>Biodata ID:</strong> {request.biodataId}</p>
            <p><strong>User Email:</strong> {request.selfEmail}</p>
            <p><strong>Status:</strong> 
              {request.status === 'pending' ? (
                <span className="text-yellow-500 font-semibold ml-2">Pending</span>
              ) : (
                <span className="text-green-600 font-semibold ml-2">Approved</span>
              )}
            </p>
            {request.status === 'pending' && (
              <Button
                type="primary"
                className="mt-4 bg-purple-500 hover:bg-purple-600"
                onClick={() => approveRequest.mutate(request._id)}
              >
                Approve
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactReq;
