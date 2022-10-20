import React from "react";
import { Tooltip, Fab, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ onClick }: any) => {
  return (
    <div>
      <Tooltip title="Back">
        <IconButton sx={{ ml: 2.5 }} onClick={onClick}>
          <Fab size="small" aria-label="add">
            <ArrowBackIcon />
          </Fab>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BackButton;
