import * as React from "react";
import { Button } from "@mui/material";

const pages = ['Proyectos'];

const DesktopMenu: React.FC = () => {
  return (
    <>
      {pages.map((page) => (
        <Button
          key={page}
          sx={{ my: 2, mx: 2, color: 'white', display: 'block'}}
        >
          {page}
        </Button>
      ))}
    </>
  );
};

export default DesktopMenu;
