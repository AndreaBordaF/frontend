import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import Navbar from "../components/common/navbar/navbar";
import ProjectSwiper from '../components/dashboard/swiperCard';
import RequestChart from '../components/dashboard/requestChard';
import LastRequestList from '../components/dashboard/lastRequestList';

const DashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box 
        sx={{
        height: '100vh',
        px: 5,
        py: 3,
      }}>
        <Box px={3} py={1}
          sx={{
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>
          <Box py={1.5} px={1} 
          sx={{
            width: '100%',
            borderBottom: '2px solid #C8CCD0'
          }}>
            <Typography variant='h6' color='#C8CCD0' fontSize={20} fontWeight={600}>Proyectos</Typography>
          </Box>
          <ProjectSwiper />
        </Box>
        <Box my={4} 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2
          }}>

          <Box sx={{ flex: 2/3 }}>
            <RequestChart />
          </Box>

          <Box sx={{ flex: 1/3 }}>
            <LastRequestList />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardPage;