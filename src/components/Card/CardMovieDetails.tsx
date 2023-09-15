import {Fab, Grid, Box, IconButton, Paper, Tooltip, Typography} from "@mui/material"
import React from "react";
import moment from "moment";
import Rating from "@mui/material/Rating/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { IMovie } from "../../../pages/types";

interface ICardDetails {
  data?: IMovie;
  removeMovie?: any;
}

const CardMovieDetails = (props: ICardDetails) => {
  const { data, removeMovie } = props;
  const router = useRouter();

  return (
    <>
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
          <Grid item md={6}>
            <Box>
              <img className="image" alt="complex" src={data?.photo_url} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {data?.name_movie}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {`
                    Release Date: ${moment(data?.date_created).format(
                      "DD/MM/YYYY"
                    )}
                  `}
                </Typography>
                <Box display="flex" gap={2} my={1}>
                  <Rating readOnly name="rating" value={data?.rating} />
                  <Typography variant="body1" gutterBottom>
                    {data?.rating || 0}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
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
                    <Fab size="small" color="primary" aria-label="edit">
                      <EditIcon
                        onClick={() => router.push(`edit/${data?.id}`)}
                      />
                    </Fab>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    sx={{ mr: 2 }}
                    onClick={() => removeMovie(data?.id)}
                  >
                    <Fab size="small" color="error" aria-label="add">
                      <DeleteIcon />
                    </Fab>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CardMovieDetails;
