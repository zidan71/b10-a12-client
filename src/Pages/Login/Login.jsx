import { Button, Input, Form } from 'antd';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Components/Hooks/UseAuth';
import { auth } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

function Login() {
  const { login } = useAuth();
  const navigate =useNavigate()
   const location = useLocation()

  
  const onFinish = (values) => {
    const { email, password } = values;
    

    login(email, password)
      .then((res) => {
        

        navigate(location?.state? location.state : '/')
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

 
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
      toast.success("Google login successful:");
        navigate(location?.state?location.state:'/')
      })
      .catch((error) => {
        toast.error("Google login error:", error.message);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Welcome Back</h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="bg-purple-500 hover:bg-purple-600 mt-4">
            Login
          </Button>

         
          <Button
            type="default"
            icon={<GoogleOutlined />}
            block
            className="bg-red-500 hover:bg-red-600 mt-4"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-500 hover:underline">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
