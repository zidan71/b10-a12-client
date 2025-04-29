import React, { useEffect, useState } from 'react';
import { Select, Card, Row, Col } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Option } = Select;

const PremiumCard = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); 

  // Fetch all biodatas
  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ['biodatas'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/biodatas');
      return res.data;
    },
  });

  // Filter and sort only premium biodatas
  useEffect(() => {
    const premium = biodatas
      .filter((b) => b.premiumStatus)
      .sort((a, b) =>
        sortOrder === 'asc'
          ? parseInt(a.age) - parseInt(b.age)
          : parseInt(b.age) - parseInt(a.age)
      )
      .slice(0, 6); // Show max 6

    setSortedData(premium);
  }, [biodatas, sortOrder]);

  // Dropdown handler
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  if (isLoading) {
    return <div className="text-center text-xl py-10">Loading Premium Profiles...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Featured Premium Profiles</h2>

      <div className="flex justify-center mb-8">
        <Select defaultValue="asc" onChange={handleSortChange} className="w-60">
          <Option value="asc">Age: Low to High</Option>
          <Option value="desc">Age: High to Low</Option>
        </Select>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {sortedData.map((bio) => (
          <Col xs={24} sm={12} md={8} key={bio._id}>
            <Card
              hoverable
              className="rounded-xl shadow-lg"
              cover={
                <img
                  alt="profile"
                  src={bio.profileImage}
                  className="h-64 w-full object-cover rounded-t-xl"
                />
              }
            >
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Biodata ID: {bio.biodataId}</h3>
              <p><span className="font-medium">Type:</span> {bio.biodataType}</p>
              <p><span className="font-medium">Division:</span> {bio.permanentDivision}</p>
              <p><span className="font-medium">Age:</span> {bio.age}</p>
              <p><span className="font-medium">Occupation:</span> {bio.occupation}</p>

              <Link
                to={`/biodata/${bio._id}`}
                className="inline-block mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition"
              >
                View Profile
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PremiumCard;
