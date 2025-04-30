import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth';

const { Header } = Layout;

function Navbar() {
  const [open, setOpen] = useState(false);
  const {user,logOut}= useAuth()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { key: '1', label: 'Home', path: '/' },
    { key: '2', label: 'Bio Datas', path: '/biodata' },
    { key: '3', label: 'About Us', path: '/about' },
    { key: '4', label: 'Contact Us', path: '/contact' },
  ];

  return (
    <Header className="bg-white shadow-md sticky top-0 z-50 flex items-center justify-between px-6 py-2">
      {/* Logo on Left */}
      <div className="text-xl font-bold text-blue-600">
      💍 SoulMateHub
      </div>

      {/* Center Menu (Desktop) */}
      <div className="hidden md:flex space-x-8 text-base font-medium">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Button on Right (Desktop) */}
      <div className="hidden md:block">
      {
        user ?  <div>

<Link to={'dashboard'}>
            Dashboard
        </Link>  

        </div>:  <Link to={'/login'}>
       <Button type="primary" className="ml-4">
          Login
        </Button>
       </Link>
      }
      </div>

      {/* Mobile Menu Icon */}
      <div className="block md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="text-xl"
        />
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className="text-gray-700 hover:text-blue-500 text-lg"
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
          {
            user ? <div>

            <Link to={'dashboard'}>
                        Dashboard
                    </Link>  
            
                    </div> : <Link to={'/login'}>
                    <Button type="primary" className="mt-4" block>
            Login
          </Button>
          </Link>
          }
        </div>
      </Drawer>
    </Header>
  );
}

export default Navbar;
