import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
  Tooltip,
} from "@mui/material";
import _ from "lodash";

interface IRow {
  id: number;
  name_movie: string;
  description: string;
  rating?: number | null;
  photo_url: string;
  date_created?: Date | null | string;
}

function Movie() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showOnClick, setshowOnClick] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/movie`);
      console.log(data);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addClick = () => {
    router.push("/movies/new");
  };

  return (
    <>
      <Box sx={{ MaxWidth: "100%", heigth: "100vh", bgcolor: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            MaxWidth: "100%",
            padding: "50px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {_.map(data, (row: IRow) => {
            const {
              id,
              name_movie,
              description,
              photo_url,
              date_created,
              rating,
            } = row;
            return (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                // alignItems="stretch"
                key={id}
                sx={{
                  height: "200",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={12}>
                  <Card sx={{ m: 1, minWidth: 292 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      src={photo_url}
                    ></CardMedia>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {name_movie}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {date_created}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Rating
                          name="read-only"
                          value={rating}
                          readOnly
                          size="small"
                        />
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>
                        {showOnClick && id === selectedId && description}{" "}
                      </Typography>
                      <Button
                        size="small"
                        // variant="contained"
                        onClick={() => {
                          setSelectedId(id);
                          console.log(id);
                          router.push(`/movies/${id}`);
                        }}
                        sx={{ color: "black", bgcolor: "white" }}
                      >
                        {/* {showOnClick ? "Hide Description" : "Show Description"} */}
                        More Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Tooltip title="Add Movie">
            <IconButton
              size="large"
              aria-label="add"
              aria-haspopup="true"
              color="inherit"
              onClick={addClick}
            >
              +
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}

export default Movie;
