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
      const res = await axios.get('https://assignment-12-server-zeta-three.vercel.app/premium-requests');
      return res.data;
    }
  });

  const approvePremiumMutation = useMutation({
    mutationFn: async ({ biodataId, requestId }) => {
      // 1. Update Biodata premium status
      await axios.patch(`https://assignment-12-server-zeta-three.vercel.app/biodatas/premium/${biodataId}`);
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
      render: (_, record) => record.name || 'N/A', // if you store name
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Biodata ID',
      dataIndex: 'biodataId',
      key: 'biodataId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => showConfirmModal(record)}>
          Make Premium
        </Button>
      ),
    },
  ];

  if (isLoading) return <div className="text-center py-20 text-xl">Loading Premium Requests...</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
      <Helmet>
      <title>Premium Request</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Manage Premium Requests</h2>

      <Table 
        columns={columns} 
        dataSource={premiumRequests} 
        rowKey={(record) => record._id} 
        pagination={{ pageSize: 8 }}
      />

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
