import * as React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Contract}from '../../services/types/project';

interface ContractToggleButtonProps {
    contracts: Contract[];
    selectedContract: string | null;
    onContractChange: (newContract: string | null) => void;
}
  
export default function ContractToggleButton({
  contracts,
  selectedContract,
  onContractChange,
}: ContractToggleButtonProps) {
  return (
    <ToggleButtonGroup
      color="secondary"
      value={selectedContract}
      exclusive
      onChange={(event, newContract) => onContractChange(newContract)}
      aria-label="Contratos"
      size="small"
    >
      <ToggleButton value="all">Todos</ToggleButton>
      {contracts.map((contract) => (
        <ToggleButton value={contract.contractNum}>
          {contract.contractNum}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
