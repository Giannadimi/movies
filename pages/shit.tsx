import _ from "lodash";
import { Box, Typography } from "@mui/material";

interface IButtonProps {
  id: string;
  label: string;
}

function IButton({ label, id }: IButtonProps) {
  return (
    <Box sx={{ bgcolor: "blue", height: "fit-content", width: "180px" }}>
      <Typography
        key={id}
        variant="button"
        component="div"
        sx={{
          width: "calc(100% - 16px)",
          margin: "auto",
          bgcolor: "white",
          maxWidth: "calc(100% - 16px)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {" "}
        {label}
      </Typography>
    </Box>
  );
}

export default function ANoob() {
  const dummyArray = [
    {
      id: "sign-up",
      label: "Sign up",
    },
    {
      id: "sign-in",
      label: "Sign in",
    },
  ] as IButtonProps[];

  return (
    <Box sx={{ bgcolor: "salmon", height: "100vh", width: "100%" }}>
      <Box
        sx={{
          bgcolor: "yellow",
          height: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {_.map(dummyArray, (button) => {
          const { id, label } = button;
          return <IButton label={label} id={id} />;
        })}
      </Box>

      <Box
        sx={{
          bgcolor: "yellow",
          height: "200px",
          width: "calc(100% - 32px)",
          margin: "auto",
        }}
      ></Box>
    </Box>
  );
}
