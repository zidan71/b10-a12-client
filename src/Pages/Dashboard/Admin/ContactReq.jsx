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
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'selfEmail',
      key: 'selfEmail',
      width: 200,
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
      width: 120,
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
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
      width: 120,
      render: (_, record) =>
        record.status === 'pending' ? (
          <Button
            type="primary"
            size="small"
            onClick={() => approveRequest.mutate(record._id)}
          >
            Approve
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4 md:p-8">
      <Helmet>
        <title>Contact Request</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6 md:mb-8">Manage Contact Requests</h2>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-2 md:p-4">
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="_id"
          pagination={{ pageSize: 7 }}
          bordered
          scroll={{ x: 800 }}
          size="middle"
        />
      </div>
    </div>
  );
};

export default ContactReq;