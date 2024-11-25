import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthWrapper({ children }: any) {
  const navigate = useNavigate()
  // const { isConnected } = useConnect()
  const isConnected = localStorage.getItem('wallet_connected') === 'true';

  useEffect(() => {
    if (!isConnected) {
      navigate('/login');
    }
  }, [localStorage]);

  return children;
}
