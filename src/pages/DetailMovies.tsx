import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box } from "@mui/material";

import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import {
  allMovies,
  tvSeriesData,
  upcomingApi,
  getMovieDetails,
} from "../api/api";
import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DetailBottom from "../sections/DetailBottom";

function DetailMovies() {
  const [details, setDetails] = useState<any>();
  const theme = useTheme();
  const { id } = useParams();

  let x = useParams();
  console.log("x=>", x);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => setDetails(data))
      .catch((error) => console.error(error));
  }, [id]);

  console.log("bıhtımmmmm", details);
  // //TOP RATED MOVIES
  const { isLoading: isLoadingTopRated, data: topRatedMovies } = useQuery(
    ["topRatedMovies"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  return (
    <MainLayout movieList={details?.data?.results}>
      <Stack
        sx={{
          height: "100%",
          width: "80%",
          marginLeft: "18rem",
          left: "17%",
        }}
      >
        <Box
          sx={{
            witdh: "100%",
            margin: "1rem  0",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=eoOaKN4qCKw"
            height={"600px"}
            width={"1000px"}
          />
        </Box>
        <DetailBottom
          details={details}
          topRated={topRatedMovies?.data?.results}
        />
      </Stack>
    </MainLayout>
  );
}

export default DetailMovies;
