import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  UserOutlined, 
  DollarOutlined, 
  ManOutlined, 
  WomanOutlined, 
  StarOutlined 
} from '@ant-design/icons'; 

const AdminDashboard = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/admin-stats');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-20 text-2xl">Loading Admin Stats...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">Admin Dashboard Overview</h1>

      <Row gutter={[24, 24]} justify="center">
        {/* Total Biodatas */}
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

        {/* Total Revenue */}
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

        {/* Male Biodatas */}
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

        {/* Female Biodatas */}
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

        {/* Premium Biodatas */}
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
    </div>
  );
};

export default AdminDashboard;
