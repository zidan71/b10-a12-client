import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, message } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const PremiumReq = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState(null);

  const { data: premiumRequests = [], isLoading } = useQuery({
    queryKey: ['premiumRequests'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/premium-requests');
      return res.data;
    }
  });

  const approvePremiumMutation = useMutation({
    mutationFn: async ({ biodataId, requestId }) => {
      await axios.patch(`http://localhost:5000/biodatas/premium/${biodataId}`);
    },
    onSuccess: () => {
      toast.success('Biodata upgraded to Premium successfully!');
      queryClient.invalidateQueries(['premiumRequests']);
    }
  });

  const showConfirmModal = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedRequest) {
      approvePremiumMutation.mutate({
        biodataId: selectedRequest.biodataId,
        requestId: selectedRequest._id
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (_, record) => record.name || 'N/A',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 200,
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
      width: 120,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Button 
          type="primary" 
          size="middle"
          onClick={() => showConfirmModal(record)}
        >
          Make Premium
        </Button>
      ),
    },
  ];

  if (isLoading) return <div className="text-center py-20 text-xl">Loading Premium Requests...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
      <Helmet>
        <title>Premium Request</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6 md:mb-8">Manage Premium Requests</h2>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-2 md:p-4">
        <Table 
          columns={columns} 
          dataSource={premiumRequests} 
          rowKey={(record) => record._id} 
          pagination={{ pageSize: 8 }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </div>

      <Modal
        title="Confirm Premium Upgrade"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Make Premium"
        cancelText="Cancel"
      >
        <p>Are you sure you want to make this biodata Premium?</p>
      </Modal>
    </div>
  );
};

export default PremiumReq;