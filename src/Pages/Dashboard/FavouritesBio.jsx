import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const FavouritesBio = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/favourites');
            setFavourites(res.data);
        } catch (error) {
            toast.error('Failed to fetch favourites');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://assignment-12-server-zeta-three.vercel.app/favourites/${id}`);
            toast.success('Deleted successfully');
            setFavourites(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Biodata ID',
            dataIndex: 'biodataId',
            key: 'biodataId',
            width: 120,
        },
        {
            title: 'Permanent Address',
            dataIndex: 'division',
            key: 'division',
            width: 180,
        },
        {
            title: 'Occupation',
            dataIndex: 'occupation',
            key: 'occupation',
            width: 150,
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (text, record) => (
                <Button 
                    danger 
                    onClick={() => handleDelete(record._id)}
                    size="middle"
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-6">
            <Helmet>
                <title>Favourites Bio</title>
            </Helmet>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6 md:mb-8">Favourite Biodatas</h1>
                <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
                    <Table
                        columns={columns}
                        dataSource={favourites}
                        rowKey="_id"
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                        bordered
                        scroll={{ x: 800 }}
                        size="middle"
                    />
                </div>
            </div>
        </div>
    );
};

export default FavouritesBio;