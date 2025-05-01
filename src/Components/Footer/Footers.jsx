import { Layout } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

function Footers() {
  return (
    <Footer className="bg-white border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">💍 SoulMateHub</h3>
          <p className="text-gray-600 text-sm">
            Find your perfect match with us. We bring hearts together with care and trust.
          </p>
        </div>

    
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/biodatas" className="hover:text-blue-500">Bio Datas</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl text-blue-500">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FacebookFilled />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramFilled />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <TwitterSquareFilled />
            </a>
          </div>
        </div>
      </div>

    
      <div className="text-center text-gray-500 text-sm py-6 border-t border-gray-100">
        © {new Date().getFullYear()} Matrimony. All Rights Reserved.
      </div>
    </Footer>
  );
}

export default Footers;
