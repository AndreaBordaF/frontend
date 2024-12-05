import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Menu, IconButton, Box } from '@mui/material';
import { LibraryAddRounded, CloseRounded } from '@mui/icons-material';
import UnitDialog from './UnitDialog';
import MasiveDialog from './MasiveDialog';

interface MultiStepDialogProps {
  contract: string;
}

export default function MultiStepDialog({ contract }: MultiStepDialogProps) {
  const [openMenu, setOpenMenu] = React.useState<HTMLElement | null>(null);
  const [openUnit, setOpenUnit] = React.useState(false);
  const [openMasive, setOpenMasive] = React.useState(false);

  const handleClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleOpenSelectedModal = (modalType: string) => {
    if (modalType === 'unit') {
      setOpenUnit(true);
    } else if (modalType === 'masive') {
      setOpenMasive(true);
    }
    setOpenMenu(null);
  };

  const handleCloseUnit = () => {
    setOpenUnit(false);
  };

  const handleCloseMasive = () => {
    setOpenMasive(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" startIcon={<LibraryAddRounded />} onClick={handleClickOpenMenu}>
        Nuevo Documento
      </Button>
      
      <Menu
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        PaperProps={{
            style: {
              minWidth: openMenu ? openMenu.offsetWidth : 'auto',
            },
        }}
      >
        <MenuItem onClick={() => handleOpenSelectedModal('unit')}>Carga Unitaria</MenuItem>
        <MenuItem onClick={() => handleOpenSelectedModal('masive')}>Carga Masiva</MenuItem>
      </Menu>
      <UnitDialog open={openUnit} handleClose={handleCloseUnit} contractNum={contract}/>
      <MasiveDialog open={openMasive} handleClose={handleCloseMasive}/>
    </React.Fragment>
  );
}
