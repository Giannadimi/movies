import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

interface IForm {
  username: string;
  email: string;
  password: string;
}

interface IErrors extends IForm { }

export default function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState<IForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleClick = () => {
    router.push("/login");
  };

  const [errors, setErrors] = useState<IErrors>({});
  const [serverErrors, setserverErrors] = useState("");

  const Regex = RegExp(
    /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
  );
  const passRegex = RegExp(/^(?=.*\d).{8,}$/);

  // TODO: passwordValidation
  const validation = (values: any, errors: any) => {
    if (!values.username) {
      errors.username = "Username is required.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    }
    if (!Regex.test(values.email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    if (!passRegex.test(values.password)) {
      errors.password =
        "Password must be more than 8 characters and at least 1 must be digit.";
    }
    return errors;
  };

  const userRegister = async () => {
    try {
      console.log(values);
      const resp = await axios.post(
        `http://localhost:3000/api/register`,
        values
      );
      if (resp.status == 200) {
        router.push("/movies");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status == 400) {
        setserverErrors(error.response.data.message);
      }
    }
  };

  const handleSubmit = () => {
    let errors = { username: "", email: "", password: "" };
    const a = validation(values, errors);
    setErrors(a);
    if (!a.username && !a.password && !a.email) {
      userRegister();
    } else {
      console.log("error");
    }
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
        <div>
          <Box
            component="form"
            sx={{
              padding: "25px",
              width: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "10px",
              backgroundColor: "#F1F1F1",
            }}
          >
            <Typography variant="h4" gutterBottom color="black">
              Sign Up
            </Typography>
<<<<<<< HEAD
            {/* TODO: Βλέπω Χρησημοποιείς μια σειρά των ζευγών TextField μαζί με errors.email etc..
                    άρα μπορείς να το κάνεις ένα δικό σου component και μετά με array.map να rendareis τα components
                    Με αυτό τον τρόπο θα κάνεις τον κώδικα πιο επεκτάσιμο και συντηρίσμο
          */}
=======
>>>>>>> 281f5a389cdbb01749513de457ac956d48c8a304
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              color="success"
              autoComplete="off"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              sx={{ mt: 1, width: 300 }}
            />
            {errors.username && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.username}</Alert>
              </Box>
            )}
            <TextField
              id="email"
              label="Email Adress"
              variant="outlined"
              color="success"
              autoComplete="off"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              sx={{ mt: 1.5, width: 300 }}
            />
            {errors.email && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.email}</Alert>
              </Box>
            )}
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              color="success"
              type="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              sx={{ mt: 1.5, width: 300 }}
            />
            {errors.password && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.password}</Alert>
              </Box>
            )}
            <Button
              variant="contained"
              color="success"
              sx={{ m: 1.5 }}
              onClick={handleSubmit}
            >
              Create an account
            </Button>
            {serverErrors && (
              <Box mt={0.8}>
                <Alert severity="error">{serverErrors}</Alert>
              </Box>
            )}
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "black", mt: 1 }}
            >
              Already have an account?
              <Button onClick={handleClick}>Login</Button>
            </Typography>
          </Box>
        </div>
      </Box>
    </>
  );
}
