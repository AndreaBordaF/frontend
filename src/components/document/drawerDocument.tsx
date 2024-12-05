import React, {useState} from 'react';
import {Drawer, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Chip, Grid2, Divider, IconButton} from '@mui/material';
import {BorderColorRounded, SubjectRounded, WorkRounded, LocalOfferRounded, SaveRounded, KeyboardDoubleArrowRightRounded} from '@mui/icons-material'
import {DocEngSelect, DocTypeSelect} from '../common/select';

const docTypes = [
  { value: 1, label: 'Tipo 1' },
  { value: 2, label: 'Tipo 2' },
  { value: 3, label: 'Tipo 3' },
];

const docIng = [
  { value: 1, label: 'Ingenieria 1' },
  { value: 2, label: 'Ingenieria 2' },
  { value: 3, label: 'Ingenieria 3' },
];



export default function DrawerDocument() {
    const [docTypeOptions, setDocTypeOptions] = useState<{ value: number; label: string }[]>([]);
    const [docEngOptions, setDocEngOptions] = useState<{ value: number; label: string }[]>([]);
    const [open, setOpen] = useState(false);
    const [formData , setFormData] = useState({
        id_document: NaN,
        doc_code: '',
        doc_department: '',
        doc_conceptArea: '',
        doc_conceptCategory: '',
        doc_name: '',
        fk_docType : NaN,
        fk_docIng: NaN,
    });
    
    const handleDocTypeChange = (value: number) => {
      setFormData(prevData => ({ ...prevData, docType: value }));
    };
    
    const handleDocEngChange = (value: number) => {
      setFormData(prevData => ({ ...prevData, docIng: value }));
    };
    
    const toggleDrawer = () => {
        setOpen(!open);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Formulario enviado:", formData);
      toggleDrawer();
    };

    return (
      <Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2 }}
          startIcon={<BorderColorRounded />}
          onClick={toggleDrawer}
        >
          Editar
        </Button>
  
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <Box
            sx={{
              height: '100vh',
              width: '40vw',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center'}}
              >
                <Typography variant="body1" fontSize={16} color='#9FA6AD'>
                  Código Interno:
                </Typography>
                <Typography variant="body1" fontSize={16} marginLeft={1} gutterBottom>
                  {formData.doc_code || 'Sin Código'}
                </Typography>
              </Box>
              <IconButton onClick={toggleDrawer}>
                <KeyboardDoubleArrowRightRounded />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                General
              </Typography>
              <form onSubmit={handleSubmit}>
                 <Grid2 container spacing={2} marginX={3} marginY={1} paddingY={2} paddingX={3}
                    sx={{
                      borderRadius: 1,
                      border: '1px solid #C8CCD0',
                    }}
                  >
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
                              name="doc_name"
                              value={formData.doc_name}
                              onChange={handleChange}
                          />
                      </Grid2>
                      <Grid2 size={5} alignContent={'center'}>
                          <Chip label="Tipo Ingenieria" icon={<WorkRounded />} size='small' sx={{background: 'none'}} />
                      </Grid2>
                      <Grid2 size={7}>
                          <TextField
                              variant="outlined"
                              color="secondary"
                              fullWidth
                              size="small"
                              margin="normal"
                              name="doc_department"
                              value={formData.doc_department}
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
                              name="doc_department"
                              value={formData.doc_department}
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
                              name="doc_department"
                              value={formData.doc_department}
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
              </form>
            </Box>
            <Divider sx={{ my: 2 }} />
  
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SaveRounded />}
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
}

export function DrawerDocumentING(){
  return(null)
};