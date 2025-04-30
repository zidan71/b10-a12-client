import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Button, message, Table } from 'antd';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const ContactReq = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['manageContactRequests'],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-server-zeta-three.vercel.app/contact-requests`);
      return res.data;
    }
  });

  const approveRequest = useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(`https://assignment-12-server-zeta-three.vercel.app/contact-requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Request approved successfully!');
      queryClient.invalidateQueries(['manageContactRequests']);
    }
  });

  if (isLoading) return <div className="text-center py-20 text-xl">Loading all contact requests...</div>;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'biodataName',
      key: 'biodataName',
    },
    {
      title: 'Email',
      dataIndex: 'selfEmail',
      key: 'selfEmail',
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) =>
        record.status === 'pending' ? (
          <span className="text-yellow-500 font-semibold">Pending</span>
        ) : (
          <span className="text-green-600 font-semibold">Approved</span>
        )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.status === 'pending' ? (
          <Button
            type="primary"
            onClick={() => approveRequest.mutate(record._id)}
          >
            Approve
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-8">
      <Helmet>
      <title>Contact Request</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Manage Contact Requests</h2>

      <div className="max-w-6xl mx-auto">
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="_id"
          pagination={{ pageSize: 7 }}
          bordered
        />
      </div>
    </div>
  );
};

export default ContactReq;
