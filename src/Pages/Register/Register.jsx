import { Button, Input, Form, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Components/Hooks/UseAuth';
import { toast } from 'react-toastify';

function Register() {
  const { register ,updateUserProfile} = useAuth(); 
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, photo, password } = values;

    try {
      const res = await register(email, password);
      

      
      await updateUserProfile(name, photo);
      toast.success('Profile Updated');

      const userInfo = {
        name,
        email: email,
       
      };
      await axios.post('http://localhost:5000/users', userInfo);
      

      toast.success('Registration Successful!');
      navigate('/');

    } catch (err) {
      toast.error(err.message);
      toast.error('Registration Failed. Try Again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Create an Account</h2>
        
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Photo URL"
            name="photo"
            rules={[{ required: true, message: 'Please input your photo URL!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your photo URL" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="bg-purple-500 hover:bg-purple-600 mt-4">
            Register
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
