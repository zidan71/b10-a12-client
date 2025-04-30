import React, { useState } from 'react';
import { Table, Button, Input, message, Tag } from 'antd';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Fetch users with optional search
const fetchUsers = async (search) => {
  const res = await axios.get(`http://localhost:5000/users?search=${search}`);
  return res.data;
};

const fetchPremiumRequests = async () => {
  const res = await axios.get('http://localhost:5000/premium-requests');
  return res.data;
};

const makeAdmin = async (id) => {
  await axios.patch(`http://localhost:5000/users/admin/${id}`);
};

const makePremium = async (id) => {
  await axios.patch(`http://localhost:5000/users/premium/${id}`);
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
    { title: 'User Name', dataIndex: 'name', key: 'name' },
    { title: 'User Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Make Admin',
      key: 'makeAdmin',
      render: (_, record) => (
        <Button
          type="primary"
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
      render: (_, record) => {
        const status = premiumStatusMap[record.email];
        if (record.role === 'premium' || status === 'approved') {
          return <Tag color="green">Already Premium</Tag>;
        }
        if (status === 'pending') {
          return (
            <>
              <Button type="default" disabled>
                Make Premium
              </Button>
              <Tag color="orange" className="ml-2">Requested</Tag>
            </>
          );
        }
        return (
          <Button type="default" onClick={() => handleMakePremium(record._id)}>
            Make Premium
          </Button>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <Input.Search
        placeholder="Search by user name"
        allowClear
        onSearch={(value) => setSearch(value)}
        className="mb-4 max-w-sm"
      />

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ManageUsers;
