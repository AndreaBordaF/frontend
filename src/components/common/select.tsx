import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface GenericSelectProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const fetchDocumentTypes = async () => {
  try {
    const response = await axios.get('http://localhost/api/doc-type');
    const data = response.data.data;
    const option = data.map((docType: any) => ({
      value: docType.id_docType,
      label: docType.docT_name,
    }));
    return option;
  } catch (error) { 
    return [];
  }
};

const fetchDocumentEngineering = async () => {
  try {
    const response = await axios.get('http://localhost/api/doc-ing');
    const data = response.data.data;
    const option = data.map((docEng: any) => ({
      value: docEng.id_docIng,
      label: docEng.docI_name,
    }));
    return option;
  } catch (error) {
    return [];
  }
}

export function SelectInput({ options, value, onChange }: GenericSelectProps) {
  
  return (
    <FormControl fullWidth size="small">
      <Select
        color="secondary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ textTransform: 'capitalize' }}
      >
        <MenuItem value="">
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export function DocTypeSelect({ onValueChange, setOptions }: { onValueChange: (value: number) => void, setOptions: (options: { value: number; label: string }[]) => void }) {
  const [options, setLocalOptions] = useState<{ value: string | number; label: string }[]>([]);
  const [value, setValue] = useState<string | number>('');
  

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await fetchDocumentTypes();
      setLocalOptions(fetchedOptions);
      setOptions(fetchedOptions);
    };
    fetchOptions();
  }, []);

  const handleChange = (newValue: string | number) => {
    setValue(newValue);
    onValueChange(Number(newValue));
  };

  return (
    <SelectInput 
      options={options} value={value} onChange={handleChange} />
  );
}

export function DocEngSelect({ onValueChange, setOptions }: { onValueChange: (value: number) => void, setOptions: (options: { value: number; label: string }[]) => void }) {
  const [options, setLocalOptions] = useState<{ value: string | number; label: string }[]>([]);
  const [value, setValue] = useState<string | number>('');

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await fetchDocumentEngineering();
      setLocalOptions(fetchedOptions);
      setOptions(fetchedOptions);
    };
    fetchOptions();
  }, []);

  const handleChange = (newValue: string | number) => {
    setValue(newValue);
    onValueChange(Number(newValue));
  };

  return (
    <SelectInput 
      options={options} value={value} onChange={handleChange} />
  );
};