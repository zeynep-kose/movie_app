import React from "react";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { Stack, Box } from "@mui/material";

import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DetailBottom from "../sections/DetailBottom";

function DetailMovies() {
  const theme = useTheme();
  const { id } = useParams();
  console.log("idddididididi", id);
  let x = useParams();
  console.log("x=>", x);

  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies"],
    () =>
      axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
        },
      })
  );

  console.log("Details", allData?.data?.title);

  //TOP RATED MOVIES
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
    <MainLayout movieList={allData?.data?.results}>
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
          details={allData?.data}
          topRated={topRatedMovies?.data?.results}
        />
      </Stack>
    </MainLayout>
  );
}

export default DetailMovies;
