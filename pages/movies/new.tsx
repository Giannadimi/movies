import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

interface IMovie {
  name_movie: string;
  description: string;
  rating: number;
  date_created: Date | null;
  photo_url: string;
}

interface IErrors extends IMovie {}

export default function AddMovie() {
  const router = useRouter();
  const firstUpdate = useRef(true);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [serverErrors, setserverErrors] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    name_movie: "",
    description: "",
    rating: "",
    date_created: "",
    photo_url: "",
  });
  const [values, setValues] = useState<IMovie>({
    name_movie: "",
    description: "",
    rating: "",
    date_created: "",
    photo_url: "",
  });

  const digitReg = RegExp(/\d/);
  const validation = (values: any) => {
    console.log(values);
    let errors = {
      name_movie: "",
      description: "",
      rating: "",
      date_created: "",
      photo_url: "",
    };
    console.log(values.rating, values.rating > 0);
    if (!values.name_movie) {
      errors.name_movie = "Movie's name can't be empty!";
    }
    if (!values.description) {
      errors.description = "Movie's description can't be empty!";
    }
    if (!values.rating) {
      errors.rating = "This field is required!";
    }
    if (!digitReg.test(values.rating)) {
      errors.rating = "This field accept only digits 1-5.";
    }
    if (values.rating <= 0 && values.rating > 5) {
      errors.rating = "Rating must be 1 - 5!";
    }
    if (!values.photo_url) {
      errors.photo_url = "This field is required!";
    }
    return errors;
  };

  const addNew = async () => {
    try {
      console.log({ values });
      const resp = await axios.post(`http://localhost:3000/api/movie`, values);
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

  const handleClick = () => {
    addNew();
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      // console.log("test");
    } else {
      const a = validation(values);
      setErrors(a);
    }
  }, [values]);

  const isDisabled = (): boolean => {
    if (
      errors.name_movie ||
      errors.description ||
      errors.rating ||
      errors.date_created ||
      errors.photo_url
    )
      return true;
    else {
      return false;
    }
  };

  const handleDate = (event: any) => {
    console.log(event._d);
    setSelectedDate(event);
    // setSelectedDate(moment(event._d).format('DD/MM/YYYY'))
    setValues({ ...values, date_created: event });
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
              width: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "12px",
              backgroundColor: "#F1F1F1",
              mt: 4,
            }}
          >
            <Typography variant="h5" gutterBottom color="black" sx={{ mt: 2 }}>
              New Movie
            </Typography>
            <TextField
              sx={{ mt: 2, width: "29.9ch" }}
              id="name"
              label="Movie's Name"
              variant="outlined"
              color="success"
              autoComplete="off"
              required
              value={values.name_movie}
              onChange={(e) =>
                setValues({ ...values, name_movie: e.target.value })
              }
            />
            {errors.name_movie && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.name_movie}</Alert>
              </Box>
            )}
            <TextField
              sx={{ mt: 2, width: "29.9ch" }}
              id="description"
              label="Description"
              variant="outlined"
              color="success"
              autoComplete="off"
              required
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            {errors.description && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.description}</Alert>
              </Box>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Release Date"
                inputFormat="DD/MM/YYYY"
                value={selectedDate}
                onChange={
                  (newValue) => handleDate(newValue)
                  // setSelectedDate(newValue)
                  // console.log(moment(newValue._d))
                }
                renderInput={(params) => (
                  <TextField sx={{ mt: 2 }} color="success" {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              sx={{ mt: 2, width: "29.9ch" }}
              id="rating"
              label="Rating"
              variant="outlined"
              color="success"
              autoComplete="off"
              required
              value={values.rating}
              onChange={(e) => setValues({ ...values, rating: e.target.value })}
            />
            {errors.rating && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.rating}</Alert>
              </Box>
            )}
            <TextField
              sx={{ mt: 2, width: "29.9ch" }}
              id="photoUrl"
              label="Photo Url"
              variant="outlined"
              color="success"
              autoComplete="off"
              required
              value={values.photo_url}
              onChange={(e) =>
                setValues({ ...values, photo_url: e.target.value })
              }
            />
            {errors.photo_url && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.photo_url}</Alert>
              </Box>
            )}
            <Button
              sx={{ mt: 1, mb: 1 }}
              variant="contained"
              disabled={isDisabled()}
              color="success"
              onClick={handleClick}
            >
              Add Movie
            </Button>
            {serverErrors && (
              <Box mt={0.8}>
                <Alert severity="error">{serverErrors}</Alert>
              </Box>
            )}
          </Box>
        </div>
      </Box>
    </>
  );
}
