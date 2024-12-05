import React, { useState } from 'react';
import { Button, TextField, Grid2, Typography } from '@mui/material';
import axios from 'axios';
import ObjectDocument from './objectDocument';

const SubForm: React.FC<{ id: number }> = ({ id }) => {
  const [subFormData, setSubFormData] = useState({
    subField1: '',
    subField2: ''
  });

  const handleSubFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubFormData({
      ...subFormData,
      [name]: value
    });
  };

  const handleSubFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/submit-sub-form', subFormData);
      console.log('Respuesta del subformulario:', response.data);
    } catch (error) {
      console.error('Error al enviar el subformulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubFormSubmit}>
      <Grid2 container>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={3} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Codigo Interno</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={2} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Area</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={1} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Diciplina</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={1} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Tipo</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={3} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Titulo</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={1} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>R</Typography>
        </Grid2>
        <Grid2 py={0.8} alignContent={'center'} textAlign={'center'} size={1} sx={{backgroundColor:'#0F2634'}}>
          <Typography variant="caption"  fontSize={14} color={'#fff'}>Acciones</Typography>
        </Grid2>
      </Grid2>
      <ObjectDocument id_proyect={id} />
    </form>
  );
};
export default SubForm;