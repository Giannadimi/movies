import React from "react";
import { Box } from "@mui/material";

interface IProps {
  children: any;
}

const DashboardLayout = (props: IProps) => {
  const { children } = props;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
