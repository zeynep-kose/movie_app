import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import useLocales from "../locales/useLocales";

import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
import MainLayout from "../layouts/MainLayout";
import RightSideBarBottom from "../components/RightSideBarBottom";
import Movie from "../sections/Movie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import MoviesPage from "./MoviesPage";

const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}

function Home() {
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  const { currentLang, allLangs, onChangeLang } = useLocales();

  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies", filter, currentLang.value, onChangeLang, setFilter],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=${currentLang.value}&page=1&sort_by=popularity.desc&with_genres=${filter.genres}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      ),
    {
      onSuccess: (allData) => {
        setFilter({ ...filter, page: filter.page });
        console.log("first", filter);
      },
    }
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=${currentLang.value}&page=${pageNumber}&sort_by=popularity.desc&with_genres=${filter.genres}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
      .then((response) => {
        console.log("=========>>>>>>>>>", response.data.results);
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        if (pageNumber < 30) {
          setPageNumber(pageNumber + 1);
        }
      });
  }, [pageNumber]);

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
  const { isLoading: isLoadingTv, data: tvSeriesData } = useQuery(
    ["tvSeriesData", currentLang.value, onChangeLang],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/discover/tv?language=${currentLang.value}&page=1&sort_by=popularity.desc`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  const { isLoading: isLoadingUpcoming, data: Upcoming } = useQuery(
    ["Upcoming", currentLang.value, onChangeLang],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?language=${currentLang.value}&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  if (isLoadingAllMovies) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout movieList={movies}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
        }}
      >
        <Movie
          movieList={allData?.data?.results}
          tvList={tvSeriesData?.data?.results}
          upcoming={Upcoming?.data?.results}
        />
      </Box>
    </MainLayout>
  );
}

export default Home;
