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
import { IMovie } from "../types";
import validation from "../functionHelper";
import Rating from "@mui/material/Rating";
import FormLayout from "../../src/layout/FormLayout";
import Divider from "@mui/material/Divider";

export interface IErrors {
  name_movie: string;
  description: string;
  rating: string;
  photo_url: string;
  date_created: string;
}

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
    rating: 0,
    date_created: "",
    photo_url: "",
  });

  const addNew = async () => {
    try {
      const resp = await axios.post(`http://localhost:3000/api/movie`, values);
      if (resp.status == 200) {
        router.push("/movies");
      }
    } catch (error) {
      console.error(error);
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
      <FormLayout>
        <Typography variant="h5">Add Movie</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          id="name"
          label="Movie's Name"
          variant="outlined"
          color="primary"
          autoComplete="off"
          required
          value={values.name_movie}
          onChange={(e) => setValues({ ...values, name_movie: e.target.value })}
        />
        {errors.name_movie && (
          <Box mt={0.8}>
            <Alert severity="error">{errors.name_movie}</Alert>
          </Box>
        )}
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          id="photoUrl"
          type="url"
          label="Photo Url"
          variant="outlined"
          color="primary"
          autoComplete="off"
          required
          value={values.photo_url}
          onChange={(e) => setValues({ ...values, photo_url: e.target.value })}
        />
        {errors.photo_url && (
          <Box mt={0.8}>
            <Alert severity="error">{errors.photo_url}</Alert>
          </Box>
        )}
        <TextField
          fullWidth
          sx={{ mt: 2 }}
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
        <Rating
          sx={{ mt: 2 }}
          name="rating"
          value={values.rating}
          onChange={(event: any, newValue: any) =>
            setValues({ ...values, rating: newValue })
          }
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
              <TextField fullWidth sx={{ mt: 2 }} color="primary" {...params} />
            )}
          />
        </LocalizationProvider>
        <Button
          sx={{ my: 5 }}
          variant="contained"
          disabled={isDisabled()}
          fullWidth
          onClick={handleClick}
        >
          Save
        </Button>
        {serverErrors && (
          <Box mt={0.8}>
            <Alert severity="error">{serverErrors}</Alert>
          </Box>
        )}
      </FormLayout>
    </>
  );
}
