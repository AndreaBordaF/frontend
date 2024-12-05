import React, { useState } from 'react';
import {Slide, Dialog, DialogTitle, IconButton, DialogActions, Button, DialogContent, TextField, Box, Typography, Grid2, Chip, CircularProgress } from '@mui/material';
import { CloseRounded, SubjectRounded, WorkRounded, LocalOfferRounded, SaveRounded } from '@mui/icons-material';
import { DocTypeSelect, DocEngSelect } from '../common/select';
import StepperComponent from '../common/stepper';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnitForm({ open, handleClose, contractNum }: { open: boolean; handleClose: () => void, contractNum: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData , setFormData] = useState({
    serialInt: "", 
    serialExt: "", 
    department: "", 
    conceptArea: "", 
    conceptCategory: "", 
    name: "", 
    numContract: contractNum, 
    docType: NaN, 
    docIng: NaN
});
  const [docTypeOptions, setDocTypeOptions] = useState<{ value: number; label: string }[]>([]);
  const [docEngOptions, setDocEngOptions] = useState<{ value: number; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDocTypeChange = (value: number) => {
    setFormData(prevData => ({ ...prevData, docType: value }));
  };
  
  const handleDocEngChange = (value: number) => {
    setFormData(prevData => ({ ...prevData, docIng: value }));
  };

const getLabelByValue = (value: number, type: 'docType' | 'docIng') => {
  const options = type === 'docType' ? docTypeOptions : docEngOptions;
  const selectedOption = options.find(option => option.value === value);
  return selectedOption ? selectedOption.label : "Selecciona un tipo";
};

  const steps = ['Datos del Documento', 'Confirmación'];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); 
    setAlertMessage("Subiendo el documento...");
   try{
      const response = await axios.post('http://localhost/api/document', formData, 
      { headers: { 'Content-Type': 'application/json' } });
      console.log('Datos del documento:', formData);
      console.log('Respuesta del servidor:', response);
      setAlertMessage("Documento subido exitosamente!");
      setConfirmationDialog(true);
      setTimeout(() => {
        setConfirmationDialog(false);
        handleClose();
        resetForm();
      }, 3000);
   }catch(error){
      console.error('Error al crear el documento:', error);
      setAlertMessage("Hubo un error al subir el documento.");
    } finally {
      setLoading(false); 
    }

  };

  const resetForm = () => {
    setFormData({
      serialInt: "", 
      serialExt: "", 
      department: "", 
      conceptArea: "", 
      conceptCategory: "", 
      name: "", 
      numContract: contractNum, 
      docType: NaN, 
      docIng: NaN
    });
    setActiveStep(0);
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid2 container spacing={2} paddingX={2}>
                <Grid2 size={12}>
                    <Typography variant="subtitle2" color="#9FA6AD">Rellene los siguientes capos para poder ingresar un documento.</Typography>  
                </Grid2> 
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Codigo Interno" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="serialInt"
                        value={formData.serialInt}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Codigo Externo" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="serialExt"
                        value={formData.serialExt}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Nombre Documento" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Area Ingenieria" icon={<WorkRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </Grid2> 
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Grupo de Control" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                  <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="conceptArea"
                        value={formData.conceptArea}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Grupo Conceptual" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                  <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        margin="normal"
                        name="conceptCategory"
                        value={formData.conceptCategory}
                        onChange={handleChange}
                  />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Disciplina" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <DocEngSelect onValueChange={handleDocEngChange} setOptions={setDocEngOptions} />
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Tipo Documento" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <DocTypeSelect onValueChange={handleDocTypeChange} setOptions={setDocTypeOptions}/>
                </Grid2>   
              </Grid2>
          </Box>
        );
      case 1:
        return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" color="#9FA6AD">Confirmación de Datos</Typography>
            <Grid2 container spacing={2} paddingX={2}>
                <Grid2 size={12}>
                    <Typography variant="subtitle2" color="#9FA6AD">Por favor revise los datos antes de confirmar</Typography>  
                </Grid2> 
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Codigo Interno" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.serialInt}</Typography>
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Codigo Externo" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.serialExt}</Typography>
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Nombre Documento" icon={<SubjectRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.name}</Typography>
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Area Ingenieria" icon={<WorkRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.department}</Typography>
                </Grid2> 
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Grupo Conceptual" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.conceptArea}</Typography>
                </Grid2> 
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Grupo de Control" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{formData.conceptCategory}</Typography>
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Disciplina" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{getLabelByValue(formData.docIng, 'docIng')}</Typography>
                </Grid2>
                <Grid2 size={5} alignContent={'center'}>
                    <Chip label="Tipo Documento" icon={<LocalOfferRounded />} size='small' sx={{background: 'none'}} />
                </Grid2>
                <Grid2 size={7}>
                    <Typography variant="body1" color="#9FA6AD">{getLabelByValue(formData.docType, 'docType')}</Typography>
                </Grid2>   
                </Grid2>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{color:"#9FA6AD"}}>
        Nuevo Documento
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"#9FA6AD"
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
      {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
              <CircularProgress />
              <Typography variant="h6">{alertMessage}</Typography>
            </Box>
          ) : confirmationDialog ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5" color="success.main">¡Documento Subido Exitosamente!</Typography>
              <Typography variant="body1">Tu documento se ha subido correctamente.</Typography>
            </Box>
          ) : (
            <>
              <StepperComponent activeStep={activeStep} steps={steps} />
              {renderStepContent(activeStep)}
            </>)}
      </DialogContent>
      {!confirmationDialog && (
        <DialogActions>
          {activeStep > 0 && !loading && (
            <Button onClick={handleBack} color="secondary">
              Atrás
            </Button>
          )}
          {activeStep < steps.length - 1 && !loading ? (
            <Button onClick={handleNext} color="secondary">
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              color="secondary"
              disabled={loading || confirmationDialog}
            >
              {loading ? 'Subiendo...' : 'Confirmar'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
