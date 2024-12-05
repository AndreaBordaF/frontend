import BtnRequest from './btnRequest';
import { Box, Typography } from '@mui/material';

const requests = [
    {
        requestNumber: '1234',
        requestDate: '12-12-24',
        state: 'emitido',
        priority: 'alta'
    },
    {
        requestNumber: '1235',
        requestDate: '12-12-24',
        state: 'corregido',
        priority: 'media'
    },
    {
        requestNumber: '1236',
        requestDate: '12-12-24',
        state: 'devuelto',
        priority: 'baja'
    }
]

export default function LastRequestList() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                width: "100%",
                paddingY: 4,
                paddingX: 4,
                backgroundColor: '#fff', 
                borderRadius: 2,
            }}
        >
            <Typography variant='h6' color='#C8CCD0' fontSize={20} fontWeight={600}>Últimas Solicitudes</Typography>
            {requests.map((request, index) => (
                <BtnRequest
                    key={index}
                    requestNumber={request.requestNumber}
                    requestDate={request.requestDate}
                    state={request.state}
                    priority={request.priority}
                />
            ))}
        </Box>
    )
}