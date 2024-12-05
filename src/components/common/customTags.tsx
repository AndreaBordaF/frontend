import {Box, Typography, Chip} from '@mui/material';
import {PriorityHighRounded, RemoveRounded, KeyboardDoubleArrowDownRounded} from '@mui/icons-material';

export function TagStateDoc(state: number) {
    switch (state) {
        case 1:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#FFECB8", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#EC7E1D"}}>En Revision</Typography>
                </Box>
            ) 
        case 2:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#CEDEFF", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#2C44E3"}}>Toma Conocimiento</Typography>
                </Box>
            ) 
        case 3:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#FFECB8", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#EC7E1D"}}>Pendiente</Typography>
                </Box>
            )
        case 4:
            return (
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#FFCCCD", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#D9282B"}}>Eliminado</Typography>
                </Box>
            )
        case 5:
            return (
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#D8CAF9", borderRadius: 1 }}>
                <Typography variant="caption" fontSize={14} sx={{color: "#7432F8"}}>Emitido</Typography>
                </Box>
            ) 
        case 6:
            return (
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#CEDEFF", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#2C44E3"}}>Comentado</Typography>
                </Box>
            )
        case 7:
            return (
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#C0EDC5", borderRadius: 1 }}>
                <Typography variant="caption" fontSize={14} sx={{color: "#118634"}}>Ap. C/Comentarios</Typography>
                </Box>
            )
        case 8:
            return (
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#C0EDC5", borderRadius: 1 }}>
                <Typography variant="caption" fontSize={14} sx={{color: "#118634"}}>Aprovado</Typography>
                </Box>
            )
        default:
            return <Chip size="small" label="No definido" color="error" />
    }
}

export const ChipState = (state: number) => {
    switch (state) {
        case 1:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#D6F6E7", borderRadius: 1 }}>
                <Typography variant="caption" fontSize={14} sx={{color: "#31a36a"}}>Aprovado</Typography>
                </Box>
            )
        case 2:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#FFF6D4", borderRadius: 1 }}>
                <Typography variant="caption" fontSize={14} sx={{color: "#F58e50"}}>En Revision</Typography>
                </Box>
            )
        case 3:
            return(
                <Box paddingY={0.2} paddingX={2} width={'fit-content'} sx={{backgroundColor: "#FFE1DF", borderRadius: 1 }}>
                    <Typography variant="caption" fontSize={14} sx={{color: "#f14e64"}}>Rechazado</Typography>
                </Box>
    
            )

    }
}

export const ChipPriority = (priority: string) => {
    if(priority === "Alta"){
        return(
            <Chip color='error' icon={<PriorityHighRounded/>} label="Alta" size="small"
            sx={{
                height: 22,
                fontSize: 12,
                backgroundColor: "#f14e64",
                color: "#fff"
            }}/>
        )
    }else if(priority === "Media"){
        return(
            <Chip color='warning' icon={<RemoveRounded/>} label="Media" size="small"
            sx={{
                height: 22,
                fontSize: 12,
                backgroundColor: "#F58e50",
                color: "#fff"
            }}/>
        )
    }else{
        return(
            <Chip color='success' icon={<KeyboardDoubleArrowDownRounded/>} label="Baja" size="small"
            sx={{
                height: 22,
                fontSize: 12,
                backgroundColor: "#31a36a",
                color: "#fff"
            }}/>
        )
    }
}