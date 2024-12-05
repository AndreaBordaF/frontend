import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/images/logo_inprolec.png";
import LoginForm from "../components/login/loginForm";
import SwiperComponent from "../components/login/loginSwiper";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          flex: 1/3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 6,
          }}
        >
            <Typography 
                variant="h4"
                fontWeight={600} 
                align="center"
                marginY={2}
                gutterBottom>
                Bienvenido
            </Typography>
            <Typography 
                variant="body1"
                align="center"
                marginY={2}
                color="textSecondary"
                gutterBottom>
                Por favor inicia sesión para continuar
            </Typography>
          <LoginForm />
        </Box>
      </Box>    
      <Box
        sx={{
          flex: 2 / 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >  
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            width: '100%',
            height: '100%',
            padding: 4,
          }}
        >
          <img
            src={logo}
            alt="Logo Inprolec"
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              width: '100px',
              height: 'auto',
              zIndex: 2,
            }}
          />
          <Typography
            variant="h1"
            fontSize={44}
            fontWeight={700}
            color="#fff"
            zIndex={3}
            position="absolute"
            bottom={70}
            left={50}
          >
            Sistema de gestión documental
          </Typography>
        </Box>  
        <SwiperComponent />
      </Box>
    </Box>
  );
};

export default LoginPage;
