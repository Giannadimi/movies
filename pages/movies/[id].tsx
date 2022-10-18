import {
  Alert,
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface IMovies {
  id: number;
  name_movie: string;
  description: string;
  rating?: number | null;
  photo_url: string;
  date_created?: Date | null;
}

export default function CardDetails() {
  const router = useRouter();
  const [data, setData] = useState<IMovies | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  console.log(router.query);
  const id = router.query.id;

  const [isloading, setIsloading] = useState(true);

  const Img = styled("img")({
    margin: "auto",
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const getData = async (id: any) => {
    try {
      console.log(id);
      setIsloading(true);
      const { data } = await axios.get(`http://localhost:3000/api/movie/${id}`);
      console.log(data);

      setIsloading(false);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeMovie = async (id: any) => {
    try {
      const resp = await axios.delete(`http://localhost:3000/api/movie/${id}`);
      if (resp.status == 200) {
        console.log(resp.data.message);
        setMessage(resp.data.message);
        setOpen(true);
        router.push("/movies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const editDescription = async (id: any) => {
  //   try {
  //     const resp = await axios.put(`http://localhost:3000/api/movie/${id}`);
  //     if (resp.status == 200) {
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id, message]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "50px",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {isloading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {!isloading && !_.isEmpty(data) ? (
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              maxWidth: 900,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={data?.photo_url} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {data?.name_movie}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <StarIcon
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                        sx={{ color: yellow[900] }}
                      />
                      {data?.rating || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Edit">
                      <IconButton sx={{ color: "black" }}>
                        <Typography
                          variant="subtitle2"
                          display="block"
                          gutterBottom
                        ></Typography>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ mr: 2 }}
                        onClick={() => removeMovie(data.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ) : null}
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
    </div>
  );
}
