import React, {useState, useEffect} from 'react';
import {Box, Typography, Link, Breadcrumbs, Button, Grid2, IconButton} from '@mui/material';
import {NavigateNextRounded, BorderColorRounded, Draw} from '@mui/icons-material';
import Navbar from "../components/common/navbar/navbar";
import DinamicTable from '../components/common/dinamicTable';
import {TagStateDoc} from '../components/common/customTags';
import DrawerDocument from '../components/document/drawerDocument';

interface Review {
    rw_id: number;
    rw_tipe: string;
    rw_version: string;
    rw_emitCode: string;
    rw_emitDate: string;
    rw_receptCode: string;
    rw_receptDate: string;
    rw_state: number;
}

const columns: { label: string; key: keyof Review; align?: "center" | "right" | "left"; render?:  (value: string | number, row: Review) => React.ReactNode }[] = [
    { label: 'Tipo Revision', key: 'rw_tipe'},
    { label: 'Version', key: 'rw_version', align: 'center'},
    { label: 'Codigo Emision', key: 'rw_emitCode'},
    { label: 'Fecha Emision', key: 'rw_emitDate', align: 'center'},
    { label: 'Codigo Recepcion', key: 'rw_receptCode'},
    { label: 'Fecha Recepcion', key: 'rw_receptDate',align: 'center'},
    { label: 'Estado', key: 'rw_state', align: 'center',
        render: (value: string | number) => (
            <Box display='flex' justifyContent="center">
                {typeof value === 'number' && TagStateDoc(value)}
            </Box>
        )
    }
];
 

const fechtReview = async (): Promise<Review[]> => { 
    return [
        { rw_id: 1, rw_tipe: 'Revision 1', rw_version: '1.0', rw_emitCode: 'EMIT001', rw_emitDate: '2024-11-01', rw_receptCode: 'RECEPT001', rw_receptDate: '2024-11-02', rw_state: 1 },
        { rw_id: 2, rw_tipe: 'Revision 2', rw_version: '2.0', rw_emitCode: 'EMIT002', rw_emitDate: '2024-11-03', rw_receptCode: 'RECEPT002', rw_receptDate: '2024-11-04', rw_state: 2 },
        { rw_id: 3, rw_tipe: 'Revision 3', rw_version: '3.0', rw_emitCode: 'EMIT003', rw_emitDate: '2024-11-05', rw_receptCode: 'RECEPT003', rw_receptDate: '2024-11-06', rw_state: 3 },
        { rw_id: 4, rw_tipe: 'Revision 4', rw_version: '4.0', rw_emitCode: 'EMIT004', rw_emitDate: '2024-11-07', rw_receptCode: 'RECEPT004', rw_receptDate: '2024-11-08', rw_state: 4 },
        { rw_id: 5, rw_tipe: 'Revision 5', rw_version: '5.0', rw_emitCode: 'EMIT005', rw_emitDate: '2024-11-09', rw_receptCode: 'RECEPT005', rw_receptDate: '2024-11-10', rw_state: 5 },
        { rw_id: 6, rw_tipe: 'Revision 6', rw_version: '6.0', rw_emitCode: 'EMIT006', rw_emitDate: '2024-11-11', rw_receptCode: 'RECEPT006', rw_receptDate: '2024-11-12', rw_state: 6 },
        { rw_id: 7, rw_tipe: 'Revision 7', rw_version: '7.0', rw_emitCode: 'EMIT007', rw_emitDate: '2024-11-13', rw_receptCode: 'RECEPT007', rw_receptDate: '2024-11-14', rw_state: 7 },
        { rw_id: 8, rw_tipe: 'Revision 8', rw_version: '8.0', rw_emitCode: 'EMIT008', rw_emitDate: '2024-11-15', rw_receptCode: 'RECEPT008', rw_receptDate: '2024-11-16', rw_state: 1 },
        { rw_id: 9, rw_tipe: 'Revision 9', rw_version: '9.0', rw_emitCode: 'EMIT009', rw_emitDate: '2024-11-17', rw_receptCode: 'RECEPT009', rw_receptDate: '2024-11-18', rw_state: 2 },
        { rw_id: 10, rw_tipe: 'Revision 10', rw_version: '10.0', rw_emitCode: 'EMIT010', rw_emitDate: '2024-11-19', rw_receptCode: 'RECEPT010', rw_receptDate: '2024-11-20', rw_state: 3 },
        { rw_id: 11, rw_tipe: 'Revision 11', rw_version: '11.0', rw_emitCode: 'EMIT011', rw_emitDate: '2024-11-21', rw_receptCode: 'RECEPT011', rw_receptDate: '2024-11-22', rw_state: 4 },
        { rw_id: 12, rw_tipe: 'Revision 12', rw_version: '12.0', rw_emitCode: 'EMIT012', rw_emitDate: '2024-11-23', rw_receptCode: 'RECEPT012', rw_receptDate: '2024-11-24', rw_state: 5 },
        { rw_id: 13, rw_tipe: 'Revision 13', rw_version: '13.0', rw_emitCode: 'EMIT013', rw_emitDate: '2024-11-25', rw_receptCode: 'RECEPT013', rw_receptDate: '2024-11-26', rw_state: 6 },
    ]
};

const DocumentDashborad: React.FC = () => {
    
    const [review, setReview] = React.useState<Review[]>([]);
      
    React.useEffect(() => {
        const fetchAPI = async () => {
            setReview(await fechtReview());
        }
        fetchAPI();
    }, []);

    return(
        <Box>
            <Navbar/>
            <Box paddingX={5} paddingY={1} 
            sx={{
                backgroundColor: "#F9FAFC",
            }}>
                <Breadcrumbs separator={<NavigateNextRounded fontSize="small"/>} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/proyecto">
                        Proyecto
                    </Link>
                    <Typography color="textPrimary">N. Documento</Typography>
                </Breadcrumbs>
            </Box>
            <Box paddingX={3} paddingY={2} marginY={2} marginX={5}
            sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                boxShadow: 1
            }}>
                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h6" color="primary">Nombre del Documento</Typography>
                    <DrawerDocument/>
                </Box>
                <Grid2 container spacing={2} sx={{marginTop: 2}}>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Tipo Ingenieria</Typography>
                        <Typography variant="body1">Nombre del Creador</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Grupo Conceptual</Typography>
                        <Typography variant="body1">Grupo Conceptual</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Clase Documento</Typography>
                        <Typography variant="body1">Clase Documento</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Grupo Control</Typography>
                        <Typography variant="body1">Grupo Control</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Disiplina</Typography>
                        <Typography variant="body1">Disiplina</Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography variant="caption" color="#C8CCD0">Tipo Documento</Typography>
                        <Typography variant="body1">Tipo Documento</Typography>
                    </Grid2>
                </Grid2>
                <Box marginY={5}>
                    <DinamicTable
                        data={review}
                        columns={columns}
                        actionColumn={{
                            label: '',
                            render: (row) => (
                                <IconButton sx={{color:"#0B5F90"}}>
                                    <BorderColorRounded/>
                                </IconButton>
                            )
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default DocumentDashborad;