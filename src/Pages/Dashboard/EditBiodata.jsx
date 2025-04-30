import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import useAuth from '../../Components/Hooks/UseAuth';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const { Option } = Select;

const EditBiodata = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [existingBiodata, setExistingBiodata] = useState(null);

  // Fetch existing biodata for this user
  useEffect(() => {
    if (user?.email) {
      axios.get(`https://assignment-12-server-zeta-three.vercel.app/biodatas/user/${user.email}`)
        .then(res => {
          setExistingBiodata(res.data);
          if (res.data) {
            // Prefill form if biodata exists
            form.setFieldsValue({
              ...res.data,
              dateOfBirth: res.data.dateOfBirth ? moment(res.data.dateOfBirth, "DD-MM-YYYY") : null
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user, form]);

  // Submit handler
  const handleSubmit = async (values) => {
    const biodataInfo = {
      ...values,
      contactEmail: user?.email,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("DD-MM-YYYY") : '',
    };

    try {
      if (existingBiodata) {
        // If already exists --> Update
        const res = await axios.patch(`https://assignment-12-server-zeta-three.vercel.app/biodatas/${existingBiodata._id}`, biodataInfo);
        if (res.data.modifiedCount > 0) {
          toast.success('Biodata updated successfully!');
        }
      } else {
        // If not exists --> Create new
        const res = await axios.post('https://assignment-12-server-zeta-three.vercel.app/biodatas', biodataInfo);
        if (res.data.insertedId) {
          toast.success('Biodata created successfully!');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 md:p-10">
      <Helmet>
        <title>Edit Biodata</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          {existingBiodata ? 'Edit Your Biodata' : 'Create Your Biodata'}
        </h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            contactEmail: user?.email,
          }}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Biodata Type"
              name="biodataType"
              rules={[{ required: true, message: 'Please select biodata type' }]}
            >
              <Select placeholder="Select">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Profile Image URL"
              name="profileImage"
              rules={[{ required: true, message: 'Please provide image link' }]}
            >
              <Input placeholder="Profile image link" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please select your birth date' }]}
            >
              <DatePicker className="w-full" format="DD-MM-YYYY" />
            </Form.Item>

            <Form.Item
              label="Height"
              name="height"
              rules={[{ required: true, message: 'Please select height' }]}
            >
              <Select placeholder="Select height">
                <Option value="5'0''">5'0''</Option>
                <Option value="5'5''">5'5''</Option>
                <Option value="6'0''">6'0''</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Weight"
              name="weight"
              rules={[{ required: true, message: 'Please select weight' }]}
            >
              <Select placeholder="Select weight">
                <Option value="50kg">50kg</Option>
                <Option value="60kg">60kg</Option>
                <Option value="70kg">70kg</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: 'Please enter age' }]}
            >
              <Input type="number" placeholder="Enter your age" />
            </Form.Item>

            <Form.Item
              label="Occupation"
              name="occupation"
              rules={[{ required: true, message: 'Please select occupation' }]}
            >
              <Select placeholder="Select occupation">
                <Option value="Student">Student</Option>
                <Option value="Engineer">Engineer</Option>
                <Option value="Doctor">Doctor</Option>
                <Option value="Businessman">Businessman</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Race (Skin Color)"
              name="race"
              rules={[{ required: true, message: 'Please select race' }]}
            >
              <Select placeholder="Select skin color">
                <Option value="Fair">Fair</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Dark">Dark</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Father's Name"
              name="fatherName"
              rules={[{ required: true, message: 'Please enter father name' }]}
            >
              <Input placeholder="Father's name" />
            </Form.Item>

            <Form.Item
              label="Mother's Name"
              name="motherName"
              rules={[{ required: true, message: 'Please enter mother name' }]}
            >
              <Input placeholder="Mother's name" />
            </Form.Item>

            <Form.Item
              label="Permanent Division"
              name="permanentDivision"
              rules={[{ required: true, message: 'Please select permanent division' }]}
            >
              <Select placeholder="Select division">
                <Option value="Dhaka">Dhaka</Option>
                <Option value="Chattagram">Chattagram</Option>
                <Option value="Rangpur">Rangpur</Option>
                <Option value="Barisal">Barisal</Option>
                <Option value="Khulna">Khulna</Option>
                <Option value="Mymensingh">Mymensingh</Option>
                <Option value="Sylhet">Sylhet</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Present Division"
              name="presentDivision"
              rules={[{ required: true, message: 'Please select present division' }]}
            >
              <Select placeholder="Select division">
                <Option value="Dhaka">Dhaka</Option>
                <Option value="Chattagram">Chattagram</Option>
                <Option value="Rangpur">Rangpur</Option>
                <Option value="Barisal">Barisal</Option>
                <Option value="Khulna">Khulna</Option>
                <Option value="Mymensingh">Mymensingh</Option>
                <Option value="Sylhet">Sylhet</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Expected Partner Age"
              name="expectedPartnerAge"
              rules={[{ required: true, message: 'Please enter expected partner age' }]}
            >
              <Input type="number" placeholder="Expected partner age" />
            </Form.Item>

            <Form.Item
              label="Expected Partner Height"
              name="expectedPartnerHeight"
              rules={[{ required: true, message: 'Please select expected partner height' }]}
            >
              <Select placeholder="Select height">
                <Option value="5'0''">5'0''</Option>
                <Option value="5'5''">5'5''</Option>
                <Option value="6'0''">6'0''</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Expected Partner Weight"
              name="expectedPartnerWeight"
              rules={[{ required: true, message: 'Please select expected partner weight' }]}
            >
              <Select placeholder="Select weight">
                <Option value="50kg">50kg</Option>
                <Option value="60kg">60kg</Option>
                <Option value="70kg">70kg</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Contact Email"
              name="contactEmail"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true, message: 'Please enter mobile number' }]}
            >
              <Input type="text" placeholder="Mobile Number" />
            </Form.Item>
          </div>

          {/* Save and Publish Button */}
          <Form.Item className="text-center mt-8">
            <Button type="primary" htmlType="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-full">
              Save and Publish Now
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default EditBiodata;



