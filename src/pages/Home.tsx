import React from "react";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
import MainLayout from "../layouts/MainLayout";
import RightSideBarBottom from "../components/RightSideBarBottom";
import Movie from "../sections/Movie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const API_Key = `c28667177075291b60900e0a0cb2824e`;

function Home() {
  // const getMovie = () => {
  //   axios

  //     .get(
  //       "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setMovieList(response.data.results);
  //       return response.data;
  //     });
  // };

  // useEffect(() => {
  //   getMovie();
  // }, [movieList]);

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
  console.log(allData);
  // const { isLoading: isLoadingTrends, data: trendsData } = useQuery(
  //   ["trendMovies"],
  //   () =>
  //     axios
  //       .get(
  //         "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  //         {
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         return console.log("trends:", res.data);
  //       })
  // );
  if (isLoadingAllMovies) {
    return <div>Loading...</div>;
  }
  // const getTrends = () => {

  //   // axios
  //   //   .get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
  //   //     headers: {
  //   //       Authorization:
  //   //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //   //     },
  //   //   })

  //   //   .then((response) => {
  //   //     console.log("trends:", response.data);
  //   //     setPhoto(response.data.results);
  //   //   });
  // };

  return (
    <MainLayout movieList={allData?.data?.results}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
        }}
      >
        <Movie movieList={allData?.data?.results} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <RightSideBar />
          <RightSideBarBottom />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;
