import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  UserOutlined,
  DollarOutlined,
  ManOutlined,
  WomanOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Helmet } from 'react-helmet-async';

const COLORS = ['#3f8600', '#1890ff', '#eb2f96', '#faad14','#cf1322'];

const AdminDashboard = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/admin-stats');
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20 text-2xl">Loading Admin Stats...</div>;
  }

  const chartData = [
    { name: 'Total Biodatas', value: stats.totalBioData },
    { name: 'Male Biodatas', value: stats.maleBiodataCount },
    { name: 'Female Biodatas', value: stats.femaleBiodataCount },
    { name: 'Premium Biodatas', value: stats.premiumBiodataCount },
    { name: 'Total Revenue ($)', value: stats.totalRevenue },
  ];

  return (
    <div className="min-h-screen p-8">
      <Helmet>
      <title>Admin Dashboard</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">Admin Dashboard Overview</h1>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg rounded-2xl">
            <Statistic
              title="Total Biodatas"
              value={stats.totalBioData}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg rounded-2xl">
            <Statistic
              title="Total Revenue (USD)"
              value={stats.totalRevenue}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<DollarOutlined />}
              suffix="$"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg rounded-2xl">
            <Statistic
              title="Male Biodatas"
              value={stats.maleBiodataCount}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ManOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg rounded-2xl">
            <Statistic
              title="Female Biodatas"
              value={stats.femaleBiodataCount}
              valueStyle={{ color: '#eb2f96' }}
              prefix={<WomanOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg rounded-2xl">
            <Statistic
              title="Premium Biodatas"
              value={stats.premiumBiodataCount}
              valueStyle={{ color: '#faad14' }}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
      </Row>

     
      <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Biodata Distribution Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
