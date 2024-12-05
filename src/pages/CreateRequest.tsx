import React, { useState } from 'react';
import { Box, Button, TextField, Grid2, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/navbar/navbar';
import axios from 'axios';
import SubForm from '../components/request/subForm';
import { SelectInput } from '../components/common/select';

const priorityOptions = [{value: 'Baja', label: 'Baja'}, {value: "Media", label: 'Media'}, {value: "Alta", label: 'Alta'}]

const CreateRequest: React.FC = () => {
    const location = useLocation();
    const { projectID } = location.state as { projectID: string };
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [selectedPriority, setSelectedPriority] = useState('');

  const [mainFormData, setMainFormData] = useState({
    subject: '',
    priority: '',
    creationDate: new Date(),
    user: user.profile.id,
  });

  const handlePriorityChange = (value: string | number) => {
    const selectedLabel = priorityOptions.find(option => option.value === value)?.label || '';
    setMainFormData(prevData => ({
      ...prevData,
      priority: selectedLabel,
    }));
  };


  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainFormData({
      ...mainFormData,
      [name]: value
    });
  };

  const handleMainFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
       const response = await axios.post('http://localhost/api/request', mainFormData,
         { headers: { 'Content-Type': 'application/json' } }
       );
       console.log('Respuesta del formulario principal:', response.data.data[0].id_request);
    } catch (error) {
      console.error('Error al enviar el formulario principal:', error);
    }
  };

  return (
    <Box sx={{
        height: '100vh',
    }}>    
        <Navbar />
        <form onSubmit={handleMainFormSubmit}>
        <Grid2 container m={5} spacing={1}>
            <Grid2 size={2} alignContent={'center'} 
            sx={{
                backgroundColor: '#0F2634',
                borderRadius: 1,
                px: 2
            }}>
                <Typography variant='caption' color='#fff' fontSize={18} fontWeight={600}>Asunto: </Typography>
            </Grid2>
            <Grid2 size={6}>
            <TextField
                variant="outlined"
                size='small'
                fullWidth
                name="subject"
                value={mainFormData.subject}
                onChange={handleMainFormChange}
            />
            </Grid2>
            <Grid2 size={2} alignContent={'center'} 
            sx={{
                backgroundColor: '#0F2634',
                borderRadius: 1,
                px: 2
            }}>
                <Typography variant='caption' color='#fff' fontSize={18} fontWeight={600}>Prioridad</Typography>
            </Grid2>
            <Grid2 size={2}>
                <SelectInput options={priorityOptions} value={mainFormData.priority} onChange={handlePriorityChange} />
            </Grid2>
        </Grid2>
            
            <Box mx={5}>
                <SubForm id={projectID} />
            </Box>

            <Button type="submit" variant="contained" color="primary">
                Enviar Formulario Principal
            </Button>
        </form>
    </Box>
  );
};

export default CreateRequest;
