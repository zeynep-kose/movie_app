import React from "react";
import LoginForm from "../components/LoginForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box } from "@mui/material";
import LoginRightPart from "../components/LoginRightPart";

function LoginPage() {
  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",

        { headers }
      )
  );

  // RECORD TOKEN TO LOCAL STORAGE
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4";
  localStorage.setItem("accessToken", token);

  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  console.log("allData:", allData);
  const title = allData?.data?.results?.original_title;
  console.log("title", title);
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <LoginForm />
      <LoginRightPart movies={allData?.data?.results} />
    </Box>
  );
}

export default LoginPage;
