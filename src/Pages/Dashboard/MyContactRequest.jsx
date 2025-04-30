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
      const res = await axios.get(`http://localhost:5000/contact-requests/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const deleteRequest = async (id) => {
    await axios.delete(`http://localhost:5000/contact-requests/${id}`);
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
      width: 150,
      render: (_, record) => record.biodataName || 'N/A'
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
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
      width: 200,
      render: (text, record) => (
        record.status === 'approved' ? record.contactEmail : 'Hidden'
      ),
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 150,
      render: (text, record) => (
        record.status === 'approved' ? record.mobileNumber : 'Hidden'
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this request?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="middle">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-6">
      <Helmet>
        <title>My Contact Req</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6 md:mb-8">My Contact Requests</h2>
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
          <Table
            columns={columns}
            dataSource={requests}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: 1000 }}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};

export default MyContactRequest;