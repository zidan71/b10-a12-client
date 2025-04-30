import React, { useState } from 'react';
import { Table, Button, Input, message, Tag } from 'antd';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const fetchUsers = async (search) => {
  const res = await axios.get(`https://assignment-12-server-zeta-three.vercel.app/users?search=${search}`);
  return res.data;
};

const fetchPremiumRequests = async () => {
  const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/premium-requests');
  return res.data;
};

const makeAdmin = async (id) => {
  await axios.patch(`https://assignment-12-server-zeta-three.vercel.app/users/admin/${id}`);
};

const makePremium = async (id) => {
  await axios.patch(`https://assignment-12-server-zeta-three.vercel.app/users/premium/${id}`);
};

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: users = [], isLoading, error } = useQuery(['users', search], () => fetchUsers(search));
  const { data: premiumRequests = [] } = useQuery(['premiumRequests'], fetchPremiumRequests);

  const { mutate: handleMakeAdmin } = useMutation(makeAdmin, {
    onSuccess: () => {
      toast.success('User is now an Admin');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => message.error('Failed to make user admin'),
  });

  const { mutate: handleMakePremium } = useMutation(makePremium, {
    onSuccess: () => {
      toast.success('User is now Premium');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => message.error('Failed to make user premium'),
  });

  const premiumStatusMap = premiumRequests.reduce((map, req) => {
    map[req.userEmail] = req.status;
    return map;
  }, {});

  const columns = [
    { 
      title: 'User Name', 
      dataIndex: 'name', 
      key: 'name',
      width: 150,
    },
    { 
      title: 'User Email', 
      dataIndex: 'email', 
      key: 'email',
      width: 200,
    },
    {
      title: 'Make Admin',
      key: 'makeAdmin',
      width: 150,
      render: (_, record) => (
        <Button
          type="primary"
          size="middle"
          onClick={() => handleMakeAdmin(record._id)}
          disabled={record.role === 'admin'}
        >
          Make Admin
        </Button>
      ),
    },
    {
      title: 'Make Premium',
      key: 'makePremium',
      width: 200,
      render: (_, record) => {
        const status = premiumStatusMap[record.email];
        if (record.role === 'premium' || status === 'approved') {
          return <Tag color="green">Already Premium</Tag>;
        }
        if (status === 'pending') {
          return (
            <div className="flex items-center">
              <Button type="default" size="middle" disabled>
                Make Premium
              </Button>
              <Tag color="orange" className="ml-2">Requested</Tag>
            </div>
          );
        }
        return (
          <Button 
            type="default" 
            size="middle"
            onClick={() => handleMakePremium(record._id)}
          >
            Make Premium
          </Button>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl font-bold mb-4">Manage Users</h1>

      <Input.Search
        placeholder="Search by user name"
        allowClear
        onSearch={(value) => setSearch(value)}
        className="mb-4 w-full md:max-w-sm"
      />

      <div className="bg-white rounded-lg shadow-md p-2 md:p-4">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: 800 }}
          size="middle"
        />
      </div>
    </div>
  );
};

export default ManageUsers;