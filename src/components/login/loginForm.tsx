import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { microsoftLogin } from "../../services/authService";
import { Stack, Button, Dialog, DialogActions, DialogContent, CircularProgress, Typography } from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<boolean | undefined>(undefined);


  const handleLogin = async () => {
    setLoading(true);
    setOpenDialog(true);
    setAuthError(undefined)

    try {
      const authData = await microsoftLogin();
      setLoading(false);

      if (authData === undefined) {
        setAuthError(true);
      } else if (authData) {
        console.log(authData);
        navigate("/dashboard");
        setAuthError(true);
      }
    } catch (error) {
      setLoading(false);
      setAuthError(true);
    }
  };

  return (
    <Stack spacing={2} marginY={6}>
      <Button
        onClick={handleLogin}
        variant="contained"
        color="secondary"
        startIcon={<MicrosoftIcon />}
      >
        Iniciar sesión con Microsoft
      </Button>

      <Dialog open={openDialog} BackdropProps={{ invisible: loading }} disableEscapeKeyDown={loading}>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h6">
              {authError ? "Usuario no registrado en el sistema." : "Autenticación exitosa. Redirigiendo..."}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!loading && authError && (
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cerrar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default LoginForm;
