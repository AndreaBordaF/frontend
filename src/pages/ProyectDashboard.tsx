import React, {useState, useEffect} from 'react';
import { Typography, Box, Tab, Tabs, Button, IconButton} from '@mui/material';
import { NoteAddRounded, OpenInNewRounded, TroubleshootOutlined} from '@mui/icons-material';
import Navbar from "../components/common/navbar/navbar";
import ProjectMenu from '../components/project/btnProjectMenu';
import ContractToggleButton from '../components/project/btnContracts';
import DinamicTable from '../components/common/dinamicTable';
import {TagStateDoc, ChipPriority, ChipState} from '../components/common/customTags';
import MultiStepDialog from '../components/project/btnNewDocument';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import { formatDate } from '../utils/formats';
import {Project, Contract} from '../services/types/project';
import axios from 'axios';

const fetchProject = async (id: string): Promise<Project> => {
    const response = await axios.get('http://localhost/api/project/' + id);
    return response.data.data;
}

interface Document {
    doc_id: number;
    doc_contract: string;
    doc_code: string;
    doc_name: string;
    doc_lastReview: string;
    doc_state: number;
}

interface Request{
    rq_id: number;
    rq_subject: string;
    rq_prioraty: string;
    rq_cr_date: string;
    rq_user: string;
    rq_state: number;
}

const columns: { label: string; key: keyof Document; align?: "center" | "right" | "left"; render?:  (value: string | number, row: Document) => React.ReactNode }[] = [
    { label: 'Codigo Interno', key: 'doc_code'},
    { label: 'Nombre Documento', key: 'doc_name'},
    { label: 'Ultima Revision', key: 'doc_lastReview', align: 'center'},
    { label: 'Estado', key: 'doc_state', align: 'center',
        render: (value: string | number) => (
            <Box display='flex' justifyContent="center">
                {TagStateDoc(Number(value))}
            </Box>
        )
    },
];

const RequestColumns: { label: string; key: keyof Request; align?: "center" | "right" | "left"; render?:  (value: string | number, row: Request) => React.ReactNode }[] = [
    { label: 'Asunto', key: 'rq_subject', align: 'left'},
    { label: 'Prioridad', key: 'rq_prioraty', align: 'center',
        render: (value: string | number) => (
            <Box display='flex' justifyContent="center">
                {ChipPriority(value as string)}
            </Box>
        )
    },
    { label: 'Fecha Creacion', key: 'rq_cr_date', align: 'center'},
    { label: 'Usuario', key: 'rq_user'},
    { label: 'Estado', key: 'rq_state', align: 'center',
        render: (value: string | number) => (
            <Box display='flex' justifyContent="center">
                {ChipState(value as number)}
            </Box>
        )
    },
];

const fetchContracts = async (id: string): Promise<Contract[]> => {
  const response = await axios.get('http://localhost/api/contract/'+ id);
  return response.data.data;
};

const fetchDocuments = async (): Promise<Document[]> => {
  return [
    { doc_id: 1, doc_contract: 'Contrato 1', doc_code: 'DOC001', doc_name: 'Document 1', doc_lastReview: '2024-11-01', doc_state: 1 },
    { doc_id: 2, doc_contract: 'Contrato 2', doc_code: 'DOC002', doc_name: 'Document 2', doc_lastReview: '2024-11-02', doc_state: 2 },
    { doc_id: 3, doc_contract: 'Contrato 1', doc_code: 'DOC003', doc_name: 'Document 3', doc_lastReview: '2024-11-03', doc_state: 3 },
    { doc_id: 4, doc_contract: 'Contrato 3', doc_code: 'DOC004', doc_name: 'Document 4', doc_lastReview: '2024-11-04', doc_state: 4 },
    { doc_id: 5, doc_contract: 'Contrato 2', doc_code: 'DOC005', doc_name: 'Document 5', doc_lastReview: '2024-11-05', doc_state: 5 },
    { doc_id: 6, doc_contract: 'Contrato 3', doc_code: 'DOC006', doc_name: 'Document 6', doc_lastReview: '2024-11-06', doc_state: 6 },
    { doc_id: 7, doc_contract: 'Contrato 1', doc_code: 'DOC007', doc_name: 'Document 7', doc_lastReview: '2024-11-07', doc_state: 7 },
    { doc_id: 8, doc_contract: 'Contrato 2', doc_code: 'DOC008', doc_name: 'Document 8', doc_lastReview: '2024-11-08', doc_state: 1 },
    { doc_id: 9, doc_contract: 'Contrato 3', doc_code: 'DOC009', doc_name: 'Document 9', doc_lastReview: '2024-11-09', doc_state: 2 },
    { doc_id: 10, doc_contract: 'Contrato 1', doc_code: 'DOC010', doc_name: 'Document 10', doc_lastReview: '2024-11-10', doc_state: 3 },
    { doc_id: 11, doc_contract: 'Contrato 2', doc_code: 'DOC011', doc_name: 'Document 11', doc_lastReview: '2024-11-11', doc_state: 4 },
    { doc_id: 12, doc_contract: 'Contrato 3', doc_code: 'DOC012', doc_name: 'Document 12', doc_lastReview: '2024-11-12', doc_state: 5 },
    { doc_id: 13, doc_contract: 'Contrato 1', doc_code: 'DOC013', doc_name: 'Document 13', doc_lastReview: '2024-11-13', doc_state: 6 },
    { doc_id: 14, doc_contract: 'Contrato 2', doc_code: 'DOC014', doc_name: 'Document 14', doc_lastReview: '2024-11-14', doc_state: 7 },
    { doc_id: 15, doc_contract: 'Contrato 3', doc_code: 'DOC015', doc_name: 'Document 15', doc_lastReview: '2024-11-15', doc_state: 1 },
    { doc_id: 16, doc_contract: 'Contrato 1', doc_code: 'DOC016', doc_name: 'Document 16', doc_lastReview: '2024-11-16', doc_state: 2 },
    { doc_id: 17, doc_contract: 'Contrato 2', doc_code: 'DOC017', doc_name: 'Document 17', doc_lastReview: '2024-11-17', doc_state: 3 },
    { doc_id: 18, doc_contract: 'Contrato 3', doc_code: 'DOC018', doc_name: 'Document 18', doc_lastReview: '2024-11-18', doc_state: 4 },
    { doc_id: 19, doc_contract: 'Contrato 1', doc_code: 'DOC019', doc_name: 'Document 19', doc_lastReview: '2024-11-19', doc_state: 5 },
    { doc_id: 20, doc_contract: 'Contrato 2', doc_code: 'DOC020', doc_name: 'Document 20', doc_lastReview: '2024-11-20', doc_state: 6 },
  ];
};  

const fetchRequests = async (): Promise<Request[]> => {
    return [
        {rq_id: 1,rq_subject: "Solicitud 1", rq_prioraty: "Alta", rq_cr_date: "2024-11-01", rq_user: "Usuario", rq_state: 1},
        {rq_id: 2,rq_subject: "Solicitud 2", rq_prioraty: "Media", rq_cr_date: "2024-11-02", rq_user: "Usuario", rq_state: 2},
        {rq_id: 3,rq_subject: "Solicitud 3", rq_prioraty: "Baja", rq_cr_date: "2024-11-03", rq_user: "Usuario", rq_state: 3},
        {rq_id: 4,rq_subject: "Solicitud 4", rq_prioraty: "Alta", rq_cr_date: "2024-11-04", rq_user: "Usuario", rq_state: 1},
        {rq_id: 5,rq_subject: "Solicitud 5", rq_prioraty: "Media", rq_cr_date: "2024-11-05", rq_user: "Usuario", rq_state: 2},
        {rq_id: 6,rq_subject: "Solicitud 6", rq_prioraty: "Baja", rq_cr_date: "2024-11-06", rq_user: "Usuario", rq_state: 3},
        {rq_id: 7,rq_subject: "Solicitud 7", rq_prioraty: "Alta", rq_cr_date: "2024-11-07", rq_user: "Usuario", rq_state: 1},
        {rq_id: 8,rq_subject: "Solicitud 8", rq_prioraty: "Media", rq_cr_date: "2024-11-08", rq_user: "Usuario", rq_state: 2},
        {rq_id: 9,rq_subject: "Solicitud 9", rq_prioraty: "Baja", rq_cr_date: "2024-11-09", rq_user: "Usuario", rq_state: 3},
        {rq_id: 10,rq_subject: "Solicitud 10", rq_prioraty: "Alta", rq_cr_date: "2024-11-10", rq_user: "Usuario", rq_state: 1},
        {rq_id: 11,rq_subject: "Solicitud 11", rq_prioraty: "Media", rq_cr_date: "2024-11-11", rq_user: "Usuario", rq_state: 2},
    ];
}


const ProjectDashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams(); 
  const projectID = location.state?.id;
  const [project, setProject] = useState<Project>();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const fetchedProject = await fetchProject(projectID);
      const fetchedContracts = await fetchContracts(projectID);
      const fetchedDocuments = await fetchDocuments();
      const fetchedRequests = await fetchRequests();
      setContracts(fetchedContracts);
      setDocuments(fetchedDocuments);
      setRequests(fetchedRequests);
      setFilteredDocuments(fetchedDocuments);
      setProject(fetchedProject);
    };

    loadData();
  }, []);

  const p_date_created = formatDate(project?.date_create || '');
  const contract = project?.contract.toString();

  const handleContractChange = (newContract: string | null) => {
    setSelectedContract(newContract);
    if (newContract === 'all') {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(
        documents.filter((data) => data.doc_contract === newContract)
      );
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNewRequest = () => {
    navigate(`/${name}/nueva-solicitud`, { state: { projectID }, replace: true });
  }

    return (
      <Box>
          <Navbar />
          <Outlet />
        <Box marginY={3} mx={5} paddingY={3} paddingX={5} sx={{
             borderRadius: 2,
             boxShadow: 1,
             backgroundColor: '#fff',
        }}>
            <Box  sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
            }}>
                <Box 
                 sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                 }}>
                    {project && (
                      <>
                        <Typography variant='h6' color='primary' fontSize={20} fontWeight={600}>{project.contract} - {project.name}</Typography>
                        <Typography variant='caption' color='#C8CCD0' fontSize={18} fontWeight={600}>{project.clientName} - Creado el: {p_date_created}</Typography>
                      </>
                    )}
                </Box>
                <ProjectMenu />
            </Box>
            <Box>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="tabs for document and request">
                        <Tab label="Solicitudes" />
                        <Tab label="Documentos" />
                </Tabs>
                {tabValue === 0 && (
                  <Box>
                  <Box marginY={1.5} display="flex" justifyContent="flex-end">
                      <Button variant="contained" color="primary" sx={{marginLeft: 2}} startIcon={<NoteAddRounded/>} onClick={handleNewRequest}>Nueva Solicitud</Button>
                  </Box>
                  <DinamicTable
                      data={requests}
                      columns={RequestColumns}
                      actionColumn={
                          {
                              label: '',
                              render: (row) => (
                                  <IconButton sx={{color:"#0B5F90"}}>
                                    <OpenInNewRounded />
                                  </IconButton>
                              )
                          }
                      }/>
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box my={3}>
                      <Box my={2}
                      sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                      }}>
                          <ContractToggleButton
                          contracts={contracts}
                          selectedContract={selectedContract}
                          onContractChange={handleContractChange}
                          /> 
                            <MultiStepDialog contract={contract|| ''} />
                      </Box>
                          <DinamicTable
                              data={filteredDocuments}
                              columns={columns}
                              actionColumn={
                                  {
                                      label: '',
                                      render: (row) => (
                                          <IconButton sx={{color:"#0B5F90"}}>
                                            <OpenInNewRounded />
                                          </IconButton>
                                      )
                                  }
                              }
                          /> 
                  </Box>
                )}
            </Box>
        </Box>
      </Box>
    );
};

export default ProjectDashboardPage;