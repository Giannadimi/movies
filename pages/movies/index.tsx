import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/router";
import { Box, Tooltip } from "@mui/material";
import { IRow } from "../types";
import { CardItem } from "../../src/components/Card/CardItem";
import DashboardLayout from "../../src/layout/DashboardLayout";

function Movie() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/movie`, {
        // headers: {
        //   authorization:
        //     "Bearer " +
        //     "e866be0adb2fd86a680d37d4fcfceb8e2e1943698012aa748d2462c7e4f3812ccc87d2f400191db6da8668d83f91dfb77b538844c4b64aaad38cd11a4dc27ad7",
        // },
      });
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
      <DashboardLayout>
        {data.map((row: IRow) => {
          const {
            name_movie,
            description,
            photo_url,
            date_created,
            rating,
            id,
          } = row;
          return (
            <CardItem
              id={id}
              photo_url={photo_url}
              date_created={date_created}
              description={description}
              name_movie={name_movie}
              rating={rating}
            />
          );
        })}
      </DashboardLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Tooltip title="Add Movie">
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={addClick} />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
}

export default Movie;
