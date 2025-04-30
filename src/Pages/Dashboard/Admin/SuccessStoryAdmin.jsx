import React, { useState } from 'react';
import { Table, Modal, Image, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SuccessStoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/successStory');
      return res.data;
    }
  });

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const columns = [
    {
      title: 'Male Biodata ID',
      dataIndex: 'selfBiodataId',
      key: 'selfBiodataId'
    },
    {
      title: 'Female Biodata ID',
      dataIndex: 'partnerBiodataId',
      key: 'partnerBiodataId'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewStory(record)}>
          View Story
        </Button>
      )
    }
  ];

  if (isLoading) {
    return <div className="text-center py-20 text-xl">Loading Success Stories...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Success Stories</h1>

      <Table
        dataSource={stories}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 6 }}
        bordered
      />

      <Modal
        title="Success Story"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>
        ]}
      >
        {selectedStory && (
          <div className="space-y-4">
            <Image src={selectedStory.coupleImage} alt="Couple" width="100%" />
            <p><strong>Marriage Date:</strong> {selectedStory.marriageDate}</p>
            <p><strong>Story:</strong> {selectedStory.review}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SuccessStoryAdmin;
