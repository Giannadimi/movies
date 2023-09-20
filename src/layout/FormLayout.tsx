import { Box, Card } from "@mui/material";
import React from "react";

interface IFormLayout {
  children: any;
}

const FormLayout = (props: IFormLayout) => {
  const { children } = props;
  return (
    <>
      <Box sx={{ display: "flex",
        justifyContent: "center",
        alignItems: "center"}}> 
      <Card style={{
        marginTop: '32px',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '16px',
      }}>
        {children}
        </Card>
      </Box>
    </>
  );
};

export default FormLayout;
