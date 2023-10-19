import React from "react";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import MyContext from "../context/Context";
import { MyContextProvider } from "../context/Context";
import { useContext } from "react";
import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
import MainLayout from "../layouts/MainLayout";
import RightSideBarBottom from "../components/RightSideBarBottom";
import MovieList from "../sections/MovieList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import MoviesPage from "./MoviesPage";
import { number } from "yup";
const API_Key = `c28667177075291b60900e0a0cb2824e`;

function Home() {
  const context = useContext(MyContext);

  const [page, setPage] = useState<number>();
  const [filterIds, setFilterIds] = useState<number[]>([]);

  //ALL FILMS
  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies", context?.setFilterIds, context?.filterIds],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&total_pages&sort_by=popularity.desc&with_genres=${context?.filterIds}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  console.log("allData:", allData);
  // filtered.filter((e: any[]) => {});

  // const genreIds: number[] =
  //   allData?.data?.results?.map((movie: any) => movie.genre_ids) || [];
  // // const filteredArrays = genreIds.filter((e) => {
  // //   return filterIds.every((filterIds) => e.includes(filterIds));
  // // });
  // // console.log("filteredArrays", filteredArrays);
  // console.log("Genre IDs:", genreIds);
  // genreIds.filter((e)=>{})
  // const filteredGenreIds = genreIds.filter((genreId) =>
  //   genreId.filter(filterIds)
  // );

  //TYPES
  const { isLoading: isLoadingTrends, data: genresData } = useQuery(
    ["GenresMovies"],
    () =>
      axios.get("https://api.themoviedb.org/3/genre/movie/list?language=tr", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
        },
      })
  );

  console.log("genresData", genresData);
  //TV SERIES

  if (isLoadingAllMovies) {
    return <div>Loading...</div>;
  }

  const genreNames = genresData?.data?.genres.map((item: any) => item);
  //console.log("2.apidengelen:", genreNames);

  // const type = genreIds.map((item: any) => {
  //   const names = item.map((typeId: any) => {});
  // });
  // console.log("Genre Names Array:", type);

  return (
    <Stack>
      <Box>
        <Search movieList={allData?.data?.results} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            paddingRight: "1rem",
            rowGap: "2rem",
          }}
        >
          <RightSideBar />
          <RightSideBarBottom />
        </Box>
        <MovieList movieList={allData?.data?.results} />
      </Box>
    </Stack>
  );
}

export default Home;
