import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, } from 'swiper/modules';
import { Dialog, DialogTitle, IconButton, DialogActions, Button, DialogContent, TextField, Box, Typography, styled, Alert, Collapse } from '@mui/material';
import { CloseRounded, CloudUploadRounded } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import StepperComponent from '../common/stepper';
import DinamicTable from '../common/dinamicTable';
import 'swiper/css';
import 'swiper/css/pagination';
import "../login/pagination.css";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function MasiveDialog({ open, handleClose }: ModalProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [colums, setColums] = useState<any[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
      readExcelFile(file);
    }
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const columns = generateColumns(jsonData as object[]);
        setColums(columns);
      setTableData(jsonData);
      console.log(jsonData);
      setSuccessMessage("El archivo se cargó correctamente. Para continuar, haga clic en Siguiente.");
        setTimeout(() => setSuccessMessage(null), 5000);
    };
    reader.readAsBinaryString(file);
  };

const generateColumns = <T extends object>(data: T[]): {
    label: string;
    key: keyof T;
    align?: "left" | "center" | "right";
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }[] => {
    if (data.length === 0) return [];
  
    const firstRowKeys = Object.keys(data[0]) as Array<keyof T>;
  
    return firstRowKeys.map((key) => ({
      label: key.toString(),
      key,
      align: "left",
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      for (const item of tableData) {
        console.log(item);
      }
      handleCloseDialog();
      alert("Datos cargados exitosamente");
    } catch (error) {
      console.error("Error al subir los datos:", error);
    }
  };

  const handleCloseDialog = () => {
    handleClose();
    setFile(null);
    setTableData([]);
    setColums([]);
    setActiveStep(0);
  };

  const steps = ['Antes de Comenzar','Subir Documentos', 'Confirmación'];
  const renderStepContent = (step: number) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Collapse in={Boolean(successMessage)}>
                <Alert
                    severity="success"
                    onClose={() => setSuccessMessage(null)}
                    sx={{ marginBottom: 2 }}
                >
                    {successMessage}
                </Alert>
            </Collapse>
            {(() => {
                switch (step) {
                    case 0:
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body1" color="#9FA6AD">
                                    Para asegurarse de que su archivo se cargue correctamente, le recomendamos seguir el formato adecuado.
                                    Esto garantizará que los datos sean procesados sin problemas.
                                </Typography>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    loop={true}
                                    speed={1800}
                                    pagination={{
                                        clickable: true,
                                        el: ".swiper-pagination",
                                    }}
                                    autoplay={{
                                        delay: 4000,
                                    }}
                                    style={{
                                        height: "400px",
                                        width: "90%",
                                        padding: "20px",
                                    }}
                                    modules={[Autoplay, Pagination]}
                                >
                                    <SwiperSlide style={{ width: '100%' }}>
                                        <Typography variant="subtitle1">1. Formato Adecuado</Typography>
                                        <Typography variant="body1" color="#9FA6AD">
                                            Asegúrese de que su archivo tenga la siguiente estructura:
                                        </Typography>
                                    </SwiperSlide>
                                    <SwiperSlide style={{ width: '100%' }}>
                                        <Typography variant="subtitle1">2. Estructura de las columnas</Typography>
                                        <Typography variant="body1" color="#9FA6AD">
                                            Verifique que su archivo Excel contenga las siguientes columnas
                                        </Typography>
                                    </SwiperSlide>
                                    <SwiperSlide style={{ width: '100%' }}>
                                        <Typography variant="subtitle1">3. Archivo limpio</Typography>
                                        <Typography variant="body1" color="#9FA6AD">
                                            Evite tener celdas vacías o datos no relacionados en su archivo.
                                        </Typography>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="swiper-pagination" />
                            </Box>
                        );
                    case 1:
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <Typography variant="body1" color="#9FA6AD">
                                    Por favor, verifique que el archivo esté en formato .xlsx o .xls antes de cargarlo. Los archivos en otros formatos no serán procesados correctamente.
                                </Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadRounded />}
                                >
                                    Cargar Archivo
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept='.xlsx, .xls'
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </Button>
                            </Box>
                        );
                    case 2:
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant="h6" color="#9FA6AD">Confirmación de Datos</Typography>
                                <Typography variant="subtitle2" color="#9FA6AD">Por favor revise los datos antes de confirmar</Typography>
                                <DinamicTable
                                    data={tableData}
                                    columns={colums} />
                            </Box>
                        );
                    default:
                        return null;
                }
            })()}
        </Box>
    );
};


  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle sx={{color:"#9FA6AD"}}>
        Carga Masiva
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StepperComponent activeStep={activeStep} steps={steps} />
            {renderStepContent(activeStep)}
        </Box>
      </DialogContent>
      <DialogActions>
      {activeStep > 0 && (
          <Button onClick={handleBack} color="secondary">
            Atrás
          </Button>
        )}
        {activeStep === 1 ? (
          <Button
            onClick={handleNext}
            color="secondary"
            variant="contained"
            disabled={!file}
          >
            Siguiente
          </Button>
        ) : activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} color="secondary" variant="contained">
            Siguiente
          </Button>
        ) : (
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
