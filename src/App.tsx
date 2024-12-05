import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ProyectDashboard from './pages/ProyectDashboard';
import DocumentDashboard from './pages/DocumentDashboard';
import PrivateRoute from './components/common/privateRoute';
import theme from './theme/theme';
import CreateRequest from './pages/CreateRequest';
import { Outlet } from 'react-router-dom';
import './App.css';

interface User {
  accessToken: string;
  refreshToken: string;
  profile: any;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: User)=> {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/dashboard" element={<PrivateRoute component={DashboardPage}/>} />
          <Route path="/:name" element={<PrivateRoute component={ProyectDashboard}/>}/>
          <Route path="/:name/nueva-solicitud" element={<PrivateRoute component={CreateRequest}/>} />
          <Route path="documento" element={<PrivateRoute component={DocumentDashboard}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
