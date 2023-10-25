import React from "react";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import MyContext from "../context/Context";
import { MyContextProvider } from "../context/Context";
import { useContext } from "react";
import useLocales from "../locales/useLocales";
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
import TvList from "../sections/TvList";
const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}
function Home() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  //TV SERIES
  const { isLoading: isLoadingTv, data: tvSeriesData } = useQuery(
    ["tvSeriesData", filter, currentLang.value, onChangeLang],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${currentLang.value}&page=${filter.page}&sort_by=popularity.desc&with_genres=${filter.genres}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      ),
    {
      onSuccess: (allData) => {
        setTotalPages(allData.data.total_pages);
      },
    }
  );
  console.log("tvSeriesData", tvSeriesData);
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

  //TV SERIES

  if (isLoadingTv) {
    return <div>Loading...</div>;
  }

  return (
    <Stack>
      <Box>
        <Search movieList={tvSeriesData?.data?.results ?? []} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
          // justifyContent: "space-around",
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
          <RightSideBar
            genres={filter.genres}
            setGenres={(genres) => setFilter({ ...filter, genres: genres })}
          />
        </Box>
        <TvList
          movieList={tvSeriesData?.data?.results ?? []}
          curentPage={page}
          setpage={(page: number) => setFilter({ ...filter, page: page })}
          total={totalPages}
        />
      </Box>
    </Stack>
  );
}

export default Home;
