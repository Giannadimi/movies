import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

interface State {
  email: string;
  password: string;
}

export default function LoggedIn(props: State) {
  const { email, password } = props;

  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setserverErrors] = useState("");

  const loginValidation = (values: any, errors: any) => {
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const userLogin = async () => {
    try {
      console.log(values);
      const resp = await axios.post(`http://localhost:3000/api/login`, values);
      if (resp.status == 200) {
        router.push("/homepage");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status == 400) {
        setserverErrors(error.response.data.message);
      }
    }
  };

  const handleLogin = () => {
    let errors = { email: "", password: "" };
    console.log(values);
    console.log(errors);
    const b = loginValidation(values, errors);
    setErrors(b);
    if (!b.password && !b.email) {
      userLogin();
    } else {
      console.log("error");
    }
  };

  const handleClick = () => {
    router.push("/register");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          padding: "250px",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        <Box
          component="form"
          sx={{
            width: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "25px",
            borderRadius: "12px",
            backgroundColor: "#F1F1F1",
          }}
        >
          <Typography variant="h4" gutterBottom color={"black"}>
            Login
          </Typography>
          <TextField
            id="email"
            variant="standard"
            label="Email Adress"
            autoComplete="off"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            sx={{ mt: 1 }}
          />
          {errors.email && (
            <Box mt={0.8}>
              <Alert severity="error">{errors.email}</Alert>
            </Box>
          )}
          <TextField
            id="password"
            variant="standard"
            label="Password"
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            sx={{ mt: 1 }}
          />
          {errors.password && (
            <Box mt={0.8}>
              <Alert severity="error">{errors.password}</Alert>
            </Box>
          )}
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {serverErrors && (
            <Box mt={0.8}>
              <Alert severity="error">{serverErrors}</Alert>
            </Box>
          )}
          <Typography variant="subtitle2" gutterBottom sx={{ color: "black" }}>
            Don't have an account?
            <Button onClick={handleClick}>Sign Up</Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
}