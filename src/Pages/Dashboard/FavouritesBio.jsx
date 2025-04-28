import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';

const FavouritesBio = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/favourites');
            setFavourites(res.data);
        } catch (error) {
            console.error(error);
            message.error('Failed to fetch favourites');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/favourites/${id}`);
            message.success('Deleted successfully');
            setFavourites(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            console.error(error);
            message.error('Failed to delete');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Biodata ID',
            dataIndex: 'biodataId',
            key: 'biodataId',
        },
        {
            title: 'Permanent Address',
            dataIndex: 'permanentAddress',
            key: 'permanentAddress',
        },
        {
            title: 'Occupation',
            dataIndex: 'occupation',
            key: 'occupation',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button danger onClick={() => handleDelete(record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Favourite Biodatas</h1>
            <Table
                columns={columns}
                dataSource={favourites}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default FavouritesBio;
