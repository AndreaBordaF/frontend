import {Card, CardContent, ButtonBase, Typography, Chip, Box } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import{formatProyectURL} from '../../utils/formats';

interface MediaCardProps {
    projectID: string;
    projectName: string;
    clientName: string;
    status: boolean;
}

export default function ProjectCard({projectID, projectName, clientName, status}: MediaCardProps) {
  const navigate = useNavigate();

  const handleProjectClick = () => {
        const formattedProjectName = formatProyectURL(projectName);
        navigate(`/${formattedProjectName}`,
            {state: {id: projectID}
        });
    };

  return (
    <ButtonBase
        onClick={handleProjectClick}
        sx={{
         width: '100%',
         height: '100%',
         borderRadius: 2,
         zIndex: 1,
         }}
    >        
        <Card 
            sx={{ 
                borderRadius: 2,
                padding: 1.2,
                width: '100%',
                height: '100%',
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
                pointerEvents: 'none',
            }}>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingY: 1.3,
                    paddingX: 0.7,
                }}
            >
                <Box>
                    <Typography gutterBottom variant="h5" component="div" textAlign={'left'} fontSize={16} fontWeight={600}>
                        {projectName}
                    </Typography>
                    <Typography variant="h6" fontSize={14} textAlign={'left'} sx={{ color: 'text.secondary' }}>
                        {clientName}
                    </Typography>
                </Box>
                <Chip variant="outlined" size="small" label={status ? 'Activo' : 'Inactivo'} 
                    sx={{
                        border: 'none',
                        color: status ? '#34D186' : '#FF6861',
                        backgroundColor: status ? '#D6F6E7' : '#FFC3C0',
                    }}
                />
            </CardContent>
        </Card>
    </ButtonBase>
  );
}
