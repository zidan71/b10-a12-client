import React from 'react';
import { CheckCircleOutlined, HeartOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';

const steps = [
  {
    icon: <UserAddOutlined className="text-4xl text-purple-600 mb-3" />,
    title: '1. Register Your Account',
    description: 'Create your profile with basic details and upload your photo. It takes less than 2 minutes.',
  },
  {
    icon: <LockOutlined className="text-4xl text-blue-500 mb-3" />,
    title: '2. Secure & Verify',
    description: 'Your biodata is secured and goes through an internal verification process.',
  },
  {
    icon: <CheckCircleOutlined className="text-4xl text-green-600 mb-3" />,
    title: '3. Become Premium',
    description: 'Get premium to unlock contact info & boost your biodata visibility.',
  },
  {
    icon: <HeartOutlined className="text-4xl text-pink-500 mb-3" />,
    title: '4. Connect & Match',
    description: 'Send requests, get connected, and explore suitable matches.',
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-white  py-16 px-6 md:px-10 shadow-inner">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl text-center shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center justify-center">
              {step.icon}
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
