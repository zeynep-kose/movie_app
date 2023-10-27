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
import { allMovies, tvSeriesData, upcomingApi } from "../api/api";

const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}

function Home() {
  const [scrollData, setScrollData] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [upcomingData, setUpComingData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState(movies.slice(0, 20));
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  const { currentLang, allLangs, onChangeLang } = useLocales();

  // const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
  //   ["allMovies", filter, currentLang.value, onChangeLang, setFilter],
  //   () =>
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=${currentLang.value}&page=1&sort_by=popularity.desc&with_genres=${filter.genres}`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     ),
  //   {
  //     onSuccess: (allData) => {
  //       setFilter({ ...filter, page: filter.page });
  //       console.log("first", filter);
  //     },
  //   }
  // );

  useEffect(() => {
    allMovies(pageNumber, currentLang.value, filter.genres)
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data]);
        if (pageNumber < 30) {
          setPageNumber(pageNumber + 1);
        }
      })
      .catch((error) => {
        console.error("API çağrısı başarısız: ", error);
      });
  }, [pageNumber]);

  //TYPES

  //TV SERIES
  // const { isLoading: isLoadingTv, data: tvSeriesData } = useQuery(
  //   ["tvSeriesData", currentLang.value, onChangeLang],
  //   () =>
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/tv?language=${currentLang.value}&page=1&sort_by=popularity.desc`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     )
  // );

  useEffect(() => {
    tvSeriesData(currentLang.value)
      .then((data: any) => {
        if (data) {
          setTvShows((prevTvShows: any) => [...prevTvShows, ...data]);
        } else {
          console.error(
            "tvSeriesData çağrısı başarısız: Veri boş veya tanımsız."
          );
        }
      })
      .catch((error) => {
        console.error("tvSeriesData çağrısı başarısız: ", error);
      });
  }, []);

  // const { isLoading: isLoadingUpcoming, data: Upcoming } = useQuery(
  //   ["Upcoming", currentLang.value, onChangeLang],
  //   () =>
  //     axios.get(
  //       `https://api.themoviedb.org/3/movie/upcoming?language=${currentLang.value}&page=1`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     )
  // );

  useEffect(() => {
    upcomingApi(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          console.log("upcoming Data: ", data);
          setUpComingData((prevUpcomingData: any) => [
            ...prevUpcomingData,
            ...data.results,
          ]);
        } else {
          console.error("upcoming çağrısı başarısız: Veri boş veya tanımsız.");
        }
      }
    );
  }, []);

  // if (isLoadingAllMovies) {
  //   return <div>Loading...</div>;
  // }

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
        <Movie movieList={movies} tvList={tvShows} upcoming={upcomingData} />
      </Box>
    </MainLayout>
  );
}

export default Home;
