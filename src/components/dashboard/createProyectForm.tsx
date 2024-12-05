import * as React from 'react';
import {ButtonBase, Button, IconButton, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Alert, CircularProgress} from "@mui/material";
import {AddCircle, CloseRounded} from "@mui/icons-material";
import axios from 'axios';

export default function FormDialog({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    date_create: new Date().toISOString().slice(0, 19).replace('T', ' '),
    name: '',
    client: '',
    contractNum: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      date_create: new Date().toISOString().slice(0, 19).replace('T', ' '),
      name: '',
      client: '',
      contractNum: '',
    });
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const pingResponse = await axios.get('http://localhost/api/healthz');
      if (pingResponse.status === 200) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post('http://localhost/api/project', formData);
          console.log(response);
          if (response.data.success === true) {
            setSuccess(true);
            onProjectAdded();
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          setError('Error al enviar los datos');
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      setError('No se puede conectar con el servidor. Intenta más tarde.');
    }
  };

  return (
    <React.Fragment>
      <ButtonBase
        onClick={handleOpen}
        sx={{
          width: '100%',
          borderRadius: 2,
          backgroundColor: "#F1F2F3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}
      >
        <AddCircle sx={{ fontSize: 30, marginBottom: 1, color: '#C8CCD0' }} />
        <Typography variant="h6" textAlign="center" color="#C8CCD0" fontSize={18}>
          Agregar Proyecto
        </Typography>
      </ButtonBase>

      {/* Diálogo para agregar proyecto */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Agregar Proyecto</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseRounded />
        </IconButton>

        <DialogContent>
          <DialogContentText>
            Completa los siguientes campos para crear un nuevo proyecto.
          </DialogContentText>

          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ marginBottom: 2 }}>¡Proyecto creado exitosamente!</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField
              required
              margin="normal"
              id="p_name"
              name="proyectName"
              label="Nombre Proyecto"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              disabled={loading || success}
              color="secondary"
            />

            <TextField
              required
              margin="normal"
              id="p_codeContract"
              name="proyectCodeContract"
              label="Número de Contrato"
              value={formData.contractNum}
              onChange={(e) => setFormData({ ...formData, contractNum: e.target.value })}
              fullWidth
              disabled={loading || success}
              color="secondary"
            />
          </Box>

          <TextField
            required
            margin="normal"
            id="p_client"
            name="clientName"
            label="Nombre Cliente"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            fullWidth
            disabled={loading || success}
            color="secondary"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={loading}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            disabled={loading || success}
          >
            {loading ? <CircularProgress size={24} /> : success ? 'Cerrar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}