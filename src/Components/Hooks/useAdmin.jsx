import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './UseAuth';

const useAdmin = () => {
  const { user } = useAuth();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axios.get(`http://localhost:5000/users/admin/${user.email}`);
      return res.data.isAdmin; 
    }
  });

  return [isAdmin, isLoading];
};

export default useAdmin;
