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

  useEffect(() => {
    allMovies(pageNumber, currentLang.value, filter.genres)
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        if (pageNumber < 30) {
          setPageNumber(pageNumber + 1);
        }
      })
      .catch((error) => {
        console.error("API çağrısı başarısız: ", error);
      });
  }, [pageNumber]);

  useEffect(() => {
    tvSeriesData(currentLang.value, filter.page, filter.genres)
      .then((data: any) => {
        if (data) {
          setTvShows((prevTvShows: any) => [...prevTvShows, ...data.results]);
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
