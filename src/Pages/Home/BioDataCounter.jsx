import React from 'react';
import { UserOutlined, ManOutlined, WomanOutlined, HomeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BioDataCounter = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/admin-stats');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-lg text-gray-600">Loading Biodata Stats...</div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">Our Community</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <UserOutlined className="text-5xl text-purple-600 mb-3" />
          <h3 className="text-xl font-semibold">Total Biodatas</h3>
          <p className="text-2xl font-bold text-purple-700 mt-2">{stats.totalBioData}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <ManOutlined className="text-5xl text-blue-600 mb-3" />
          <h3 className="text-xl font-semibold">Male Biodatas</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">{stats.maleBiodataCount}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <WomanOutlined className="text-5xl text-pink-500 mb-3" />
          <h3 className="text-xl font-semibold">Female Biodatas</h3>
          <p className="text-2xl font-bold text-pink-600 mt-2">{stats.femaleBiodataCount}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <HomeOutlined className="text-5xl text-pink-500 mb-3" />
          <h3 className="text-xl font-semibold">Marriage Completed</h3>
          <p className="text-2xl font-bold text-pink-600 mt-2">{stats.successMarriage}</p>
        </div>
      </div>
    </div>
  );
};

export default BioDataCounter;
