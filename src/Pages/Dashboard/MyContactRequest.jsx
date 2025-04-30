import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../Components/Hooks/UseAuth';
import { Table, Tag, Button, Popconfirm, message } from 'antd';
import { Helmet } from 'react-helmet-async';

const MyContactRequest = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['myContactRequests', user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-12-server-zeta-three.vercel.app/contact-requests/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const deleteRequest = async (id) => {
    await axios.delete(`https://assignment-12-server-zeta-three.vercel.app/contact-requests/${id}`);
  };

  const { mutate: handleDelete } = useMutation(deleteRequest, {
    onSuccess: () => {
      message.success('Request deleted!');
      queryClient.invalidateQueries(['myContactRequests']);
    },
    onError: () => message.error('Failed to delete'),
  });

  if (isLoading) return <div className="text-center py-20 text-xl">Loading your requests...</div>;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'biodataName',
      key: 'biodataName',
      render: (_, record) => record.biodataName || 'N/A'
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color={text === 'approved' ? 'green' : 'gold'}>
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
      render: (text, record) => (
        record.status === 'approved' ? record.contactEmail : 'Hidden'
      ),
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      render: (text, record) => (
        record.status === 'approved' ? record.mobileNumber : 'Hidden'
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this request?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <Helmet>
      <title>My Contact Req</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">My Contact Requests</h2>
      <div className="bg-white shadow-lg p-6 rounded-xl max-w-6xl mx-auto">
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>
    </div>
  );
};

export default MyContactRequest;
