import React from "react";
import * as yup from "yup";
import {
  TextField,
  Autocomplete,
  Stack,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DetailBottom from "../sections/DetailBottom";
function DetailMovies() {
  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

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
            style={{ width: "500px", height: "300px" }}
          />
        </Box>
        <DetailBottom
          details={allData?.data?.results}
          topRated={topRatedMovies?.data?.results}
        />
      </Stack>
    </MainLayout>
  );
}

export default DetailMovies;
