import React from "react";
import {
  Box,
  Snackbar,
  Button,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import BackButton from "../../../src/components/Button/BackButton";
import validation from "../../functionHelper";
import { IMovie } from "../../types";
import { IErrors } from "../new";
import Rating from "@mui/material/Rating/Rating";

export default function editMovie() {
  const router = useRouter();
  const [serverErrors, setserverErrors] = useState("");
  const [data, setData] = useState<IMovie | undefined | any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [loading, setIsloading] = useState(true);

  const id = router.query.id;

  const [errors, setErrors] = useState<IErrors>({
    name_movie: "",
    description: "",
    rating: "",
    date_created: "",
    photo_url: "",
  });

  const handleDate = (event: any) => {
    setSelectedDate(event);
    // setSelectedDate(moment(event._d).format('DD/MM/YYYY'))
    setData({ ...data, date_created: event });
  };

  const getData = async (id: any) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/movie/${id}`);
      console.log(data);
      if (!data?.date_created) {
        data.date_created = null;
      }
      setData(data);
      setIsloading(false);
    } catch (error: any) {
      console.error(error);
      if (error?.response.status == 400) {
        setserverErrors(error?.response.data.message);
      }
      setIsloading(false);
    }
  };

  const editDescription = async () => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/api/movie/${id}`,
        data
      );
      if (resp.status == 200) {
        setOpen(true);
        router.push("/movies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = (): boolean => {
    if (
      errors.name_movie ||
      errors.description ||
      errors.rating ||
      errors.photo_url
    )
      return true;
    else {
      return false;
    }
  };

  const handleClick = () => {
    editDescription();
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id, message]);

  useEffect(() => {
    const a = validation(data);
    setErrors(a);
  }, [data]);

  if (loading) {
    return "Loading...";
  }
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
          padding: "340px",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        
        <>
        
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
              Edit Movie
            </Typography>
            <TextField
              sx={{ mt: 2, width: 300 }}
              id="name"
              label="Movie's Name"
              variant="outlined"
              color="primary"
              focused
              autoComplete="off"
              required
              value={data?.name_movie}
              onChange={(e) => setData({ ...data, name_movie: e.target.value })}
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
              focused
              autoComplete="off"
              required
              value={data?.photo_url}
              onChange={(e) => setData({ ...data, photo_url: e.target.value })}
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
              focused
              autoComplete="off"
              multiline
              maxRows={4}
              required
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            {errors.description && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.description}</Alert>
              </Box>
            )}
            <Rating
              sx={{ mt: 2, width: 300 }}
              name="rating"
              value={data?.rating}
              onChange={(e, newValue: any) =>
                setData({ ...data, rating: newValue })
              }
            />
            {/* <TextField
              sx={{ mt: 2, width: 300 }}
              id="rating"
              label="Rating"
              variant="outlined"
              color="primary"
              focused
              autoComplete="off"
              required
              value={data?.rating}
              onChange={(e) => setData({ ...data, rating: e.target.value })}
            /> */}
            {errors.rating && (
              <Box mt={0.8}>
                <Alert severity="error">{errors.rating}</Alert>
              </Box>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Release Date"
                inputFormat="DD/MM/YYYY"
                value={data?.date_created}
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
        </>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
