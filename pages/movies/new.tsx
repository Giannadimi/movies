import * as React from "react";
import { Box, Button, Typography, Container, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import BackButton from "../../src/components/Button/BackButton";

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
  const urlReg = RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );

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
      errors.name_movie = "Movie's name can't be empty.";
    }
    if (!values.photo_url) {
      errors.photo_url = "Movie's photo Url can't be empty.";
    } else if (!urlReg.test(values.photo_url)) {
      errors.photo_url = "Enter an image URL.";
    }
    if (!values.description) {
      errors.description = "Movie's description can't be empty.";
    }
    if (!values.rating) {
      errors.rating = "This field is required.";
    } else if (!digitReg.test(values.rating)) {
      errors.rating = "This field accept only digits 1 to 5.";
    } else if (values.rating <= 0 && values.rating > 5) {
      errors.rating = "This field accept only digits 1 to 5.";
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
    const a = validation(values);
    setErrors(a);
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
    setValues({ ...values, date_created: event });
  };

  return (
    <>
      <Box mt={9}>
        <BackButton
          onClick={() => {
            router.push("/movies");
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          MaxWidth: "100%",
          height: "100vh",
          mt: 1,
          padding: "340px",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        <Box
          component="form"
          sx={{
            width: 460,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "8px",
            backgroundColor: "#F1F1F1",
            mt: 4,
          }}
        >
          <Typography variant="h5" gutterBottom color="black" sx={{ mt: 2 }}>
            Add Movie
          </Typography>
          <TextField
            sx={{ mt: 2, width: 300 }}
            id="name"
            label="Movie's Name"
            variant="outlined"
            color="primary"
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
            sx={{ mt: 2, width: 300 }}
            id="photoUrl"
            type="url"
            label="Photo Url"
            variant="outlined"
            color="primary"
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
          <TextField
            sx={{ mt: 2, width: 300 }}
            id="description"
            label="Description"
            variant="outlined"
            color="primary"
            autoComplete="off"
            multiline
            rows={4}
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
          <TextField
            sx={{ mt: 2, width: 300 }}
            id="rating"
            label="Rating"
            variant="outlined"
            color="primary"
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Release Date"
              inputFormat="DD/MM/YYYY"
              value={selectedDate}
              onChange={(newValue) => handleDate(newValue)}
              renderInput={(params) => (
                <TextField
                  sx={{ mt: 2, width: 300 }}
                  color="primary"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <Button
            sx={{ mt: 1, mb: 1 }}
            variant="contained"
            disabled={isDisabled()}
            color="primary"
            onClick={handleClick}
          >
            Save
          </Button>
          {serverErrors && (
            <Box mt={0.8}>
              <Alert severity="error">{serverErrors}</Alert>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
