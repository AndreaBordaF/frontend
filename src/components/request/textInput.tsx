import React, { useState, useEffect } from 'react';
import { Autocomplete, InputBase } from '@mui/material';
import axios from 'axios';

interface Option {
  id: string;
  label: string;
}

interface SearchBarProps {
  id: number;
  onSelect: (selectedItem: Option | null) => void;
}

const SearchBarWithAutocomplete: React.FC<SearchBarProps> = ({ id, onSelect }) => {
  console.log('ID del proyecto en el subformulario:', id);

  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost/api/document/py/${id}`);
        if(Array.isArray(response.data.data)){
          const fetchedOptions = response.data.data.map((item: any) => ({
            id: item.id_document,
            label: item.doc_serialInt,
          }));
          setAllOptions(fetchedOptions);
        } else {
          console.error('No soy un array', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAllOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOptions();
  }, [id]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions([]);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const matchingOptions = allOptions.filter((option) =>
      option.label.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredOptions(matchingOptions);
  }, [searchTerm, allOptions]);

  const handleOptionSelect = (event: React.SyntheticEvent, value: Option | null) => {
    onSelect(value);
  };

  return (
    <Autocomplete
      freeSolo
      loading={loading}
      options={filteredOptions}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      onInputChange={(event, value) => setSearchTerm(value)}
      onChange={(event, value) => handleOptionSelect(event, value as Option | null)}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          {...params}
          placeholder="Buscar"
          fullWidth
        />
      )}
    />
  );
};

export default SearchBarWithAutocomplete;
