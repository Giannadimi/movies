import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { Box } from "@mui/system";
import BackButton from "../../src/components/Button/BackButton";
import { IRow } from "../types";
import CardMovieDetails from "../../src/components/Card/CardMovieDetails";

export default function CardDetails() {
  const router = useRouter();
  const [data, setData] = useState<IRow | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const id = router.query.id;

  const [isloading, setIsloading] = useState(true);

  const getData = async (id: number) => {
    try {
      setIsloading(true);
      const { data } = await axios.get(`http://localhost:3000/api/movie/${id}`);
      setIsloading(false);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeMovie = async (id: number) => {
    try {
      const resp = await axios.delete(`http://localhost:3000/api/movie/${id}`);
      if (resp.status == 200) {
        setMessage(resp.data.message);
        setOpen(true);
        router.push("/movies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData(id as any);
    }
  }, [id, message]);

  return (
    <div>
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
          width: "100%",
          padding: "40px",
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
          <CardMovieDetails data={data} removeMovie={removeMovie} />
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
