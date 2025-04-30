import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from 'axios';
import useAuth from '../../Components/Hooks/UseAuth';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const ViewBiodata = () => {
  const { user } = useAuth();
  const [biodata, setBiodata] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch user's biodata
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/biodatas/user/${user.email}`)
        .then(res => {
          setBiodata(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    try {
      const premiumRequest = {
        name:biodata.name,
        biodataId: biodata.biodataId,
        userEmail: user.email,
        status: 'pending'
      };

      const res = await axios.post('http://localhost:5000/premium-requests', premiumRequest);

      if (res.data.insertedId) {
        toast.success('Request sent to Admin for Premium Approval!');
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong!');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!biodata) {
    return <div className="text-center py-20 text-lg text-gray-600">Loading your biodata...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 md:p-10">
      <Helmet>
        <title>View Biodata</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">My Biodata Information</h2>

        <div className="flex flex-col items-center gap-6">
          <img src={biodata.profileImage} alt="Profile" className="w-48 h-48 rounded-full object-cover mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 w-full">
            <p><span className="font-semibold">Name:</span> {biodata.name}</p>
            <p><span className="font-semibold">Biodata Type:</span> {biodata.biodataType}</p>
            <p><span className="font-semibold">Date of Birth:</span> {biodata.dateOfBirth}</p>
            <p><span className="font-semibold">Height:</span> {biodata.height}</p>
            <p><span className="font-semibold">Weight:</span> {biodata.weight}</p>
            <p><span className="font-semibold">Age:</span> {biodata.age}</p>
            <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
            <p><span className="font-semibold">Race:</span> {biodata.race}</p>
            <p><span className="font-semibold">Father's Name:</span> {biodata.fatherName}</p>
            <p><span className="font-semibold">Mother's Name:</span> {biodata.motherName}</p>
            <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
            <p><span className="font-semibold">Present Division:</span> {biodata.presentDivision}</p>
            <p><span className="font-semibold">Expected Partner Age:</span> {biodata.expectedPartnerAge}</p>
            <p><span className="font-semibold">Expected Partner Height:</span> {biodata.expectedPartnerHeight}</p>
            <p><span className="font-semibold">Expected Partner Weight:</span> {biodata.expectedPartnerWeight}</p>
            <p><span className="font-semibold">Contact Email:</span> {biodata.contactEmail}</p>
            <p><span className="font-semibold">Mobile Number:</span> {biodata.mobileNumber}</p>
          </div>

          {/* Make Premium Button */}
          <Button
            type="primary"
            className="mt-8 bg-purple-500 hover:bg-purple-600 rounded-full px-8 py-2 text-lg"
            onClick={showModal}
          >
            Make Biodata Premium
          </Button>

          {/* Confirmation Modal */}
          <Modal
            title="Confirm Premium Request"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes, Make Premium"
            cancelText="No"
          >
            <p>Are you sure you want to make your biodata premium?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
