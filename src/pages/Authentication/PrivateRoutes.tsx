import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('login'));
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoutes;
