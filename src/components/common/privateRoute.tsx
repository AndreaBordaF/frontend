import React, { useEffect } from 'react';
import { useNavigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component}) => {
    const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

 useEffect(() => {
   if (!user) {
     navigate('/');
   }
 }, [user, navigate]);

 if(!user) return null;

  return <Component />;
};

export default PrivateRoute;

