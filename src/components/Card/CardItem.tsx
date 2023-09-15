import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { CardActions, Rating, Typography } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import CardActionArea from "@mui/material/CardActionArea";

interface ICardProps {
  id?: number;
  name_movie?: string;
  description?: string;
  rating?: number;
  photo_url?: string;
  date_created?: Date | string | null;
}

export const CardItem = (props: ICardProps) => {
  const { id, photo_url, name_movie, date_created, rating } = props;

  return (
    <>
      <Link href={`/movies/${id}`}>
        <Card
          key={id}
          sx={{
            m: 1,
            minWidth: 290,
            maxWidth: 300,
          }}
          className="card"
        >
          <CardActionArea>
            <CardMedia component="img" height="200" src={photo_url}></CardMedia>
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
              <Typography gutterBottom variant="body2" component="div">
                Release Date: {moment(date_created).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Rating name="read-only" value={rating} readOnly size="small" />
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            ></CardActions>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
};
