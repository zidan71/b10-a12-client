import React from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch Users Function
const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    return res.data;
};

// Make Admin Function
const makeAdmin = async (id) => {
    await axios.patch(`http://localhost:5000/users/admin/${id}`);
};

// Make Premium Function
const makePremium = async (id) => {
    await axios.put(`http://localhost:5000/users/premium/${id}`);
};

const ManageUsers = () => {
    const queryClient = useQueryClient();

    // Using useQuery to fetch users
    const { data: users, isLoading, error } = useQuery(['users'], fetchUsers);

    // Using mutation hooks for Make Admin and Make Premium actions
    const { mutate: handleMakeAdmin } = useMutation(makeAdmin, {
        onSuccess: () => {
            message.success('User is now an Admin');
            queryClient.invalidateQueries(['users']);  // Invalidate and refetch users
        },
        onError: () => message.error('Failed to make user admin'),
    });

    const { mutate: handleMakePremium } = useMutation(makePremium, {
        onSuccess: () => {
            message.success('User is now Premium');
            queryClient.invalidateQueries(['users']);
        },
        onError: () => message.error('Failed to make user premium'),
    });

    // Columns for the table
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Make Admin',
            key: 'makeAdmin',
            render: (text, record) => (
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
            render: (text, record) => (
                <Button
                    type="default"
                    onClick={() => handleMakePremium(record._id)}
                    disabled={record.role === 'premium'}
                >
                    Make Premium
                </Button>
            ),
        },
    ];

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
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
