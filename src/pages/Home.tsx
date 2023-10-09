import React from "react";
import { Stack, Box } from "@mui/material";
import { useState } from "react";
import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
const API_Key = `c28667177075291b60900e0a0cb2824e`;

function Home() {
  const [movieList, setMovieList] = useState<string[]>([]);
  const getMovie = () => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?key=${API_Key}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovieList(response.data);
        return response.data;
      });
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {" "}
      <LeftSideBar />
      <Search movieList={movieList}></Search>
    </Stack>
  );
}

export default Home;
