import React, {useEffect, useState} from 'react';
import {Box, Grid2, Typography, InputBase, Button} from '@mui/material'
import SearchBarWithAutocomplete from './textInput'
import axios from 'axios';

interface DocumentDetails {
    id_document: string;
    doc_serialInt: string;
    doc_department: string;
    doc_conceptArea: string;
    docT_name: string;
    doc_name: string;
    rw_version: string;
}

const ObjectDocument: React.FC<{ id_proyect: number }> = ({ id_proyect }) => {
    const [selectedItem, setSelectedItem] = useState<{ id: string, label: string } | null>(null);
    const [documentDetailsList, setDocumentDetailsList] = useState<DocumentDetails[]>([]);

  const handleSelectItem = (item: { id: string, label: string } | null) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchSelectedItemInfo = async () => {
      if (selectedItem?.id) {
        try {
          const response = await axios.get(`http://localhost/api/document/rw/${selectedItem.id}`);
          if (response.data && response.data.data) {
            const document = response.data.data[0];

            if(!document) {
              console.error('Document not found');
              return;
            }

            if(documentDetailsList.some(doc => doc.id_document === document.id_document)) {
              console.error('Document already added');
              return;
            }

            const documentInfo: DocumentDetails = {
              id_document: selectedItem.id,
              doc_serialInt: document.doc_serialInt,
              doc_department: document.doc_department,
              doc_conceptArea: document.doc_conceptArea,
              docT_name: document.docT_name,
              doc_name: document.doc_name,
              rw_version: document.rw_version,
            };

            setDocumentDetailsList(prevList => [...prevList, documentInfo]);
            setSelectedItem(null);
            console.log('Document info:', documentDetailsList);
          }
        } catch (error) {
          console.error('Error fetching document info:', error);
        }
      }
    };

    fetchSelectedItemInfo();
  }, [selectedItem]); 

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Document details:', documentDetailsList);
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: "#fff" }}>
        <Box sx={{ width: '100%', backgroundColor: "#fff" }}>
          <Grid2 container>
            <Grid2 size={3}>
                <SearchBarWithAutocomplete id={id_proyect} onSelect={handleSelectItem} />
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
            <Grid2 size={1}>
            </Grid2>
          </Grid2>
        </Box>

      {documentDetailsList.map((documentDetails, index) => (
        <Box sx={{ width: '100%', backgroundColor: "#fff" }} key={index}>
          <Grid2 container>
            <Grid2 size={3}>
              <Typography variant="body2">{documentDetails.doc_name}</Typography>
            </Grid2>
            <Grid2 size={2}>
              <Typography variant="body2">{documentDetails.doc_department}</Typography>
            </Grid2>
            <Grid2 size={1}>
              <Typography variant="body2">{documentDetails.doc_conceptArea}</Typography>
            </Grid2>
            <Grid2 size={1}>
              <Typography variant="body2">{documentDetails.docT_name}</Typography>
            </Grid2>
            <Grid2 size={3}>
              <Typography variant="body2">{documentDetails.doc_name}</Typography>
            </Grid2>
            <Grid2 size={1}>
              <Typography variant="body2">{documentDetails.rw_version}</Typography>
            </Grid2>
            <Grid2 size={1}>
              <InputBase fullWidth placeholder="Acciones" />
            </Grid2>
          </Grid2>
        </Box>
      ))}
      
      <Box sx={{ width: '100%', justifyContent: 'left'}}>
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>Enviar</Button>
      </Box>
    </Box>
  );
}

export default ObjectDocument;