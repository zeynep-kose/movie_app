/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import useLocales from "../locales/useLocales";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Movie from "../sections/Movie";
//import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import MoviesPage from "./MoviesPage";
import { allMovies, tvSeriesData, upcomingApi } from "../api/api";

const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}

function Home() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any>([]);
  const [upcomingData, setUpComingData] = useState<any[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  const [done, setDone] = useState<any[]>([]);

  useEffect(() => {
    allMovies(pageNumber, currentLang.value, filter.genres)
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        if (pageNumber < 2) {
          setPageNumber(pageNumber + 1);
        } else {
          setDone(movies);
        }
      })
      .catch((error) => {
        console.error("API çağrısı başarısız: ", error);
      });
  }, [pageNumber, currentLang.value]);

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
  }, [currentLang.value]);
  const [isCurrent, setIsCurrent] = useState(currentLang.value);

  useEffect(() => {
    upcomingApi(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          console.log("upcoming Data: ", data.results[0].poster_path);
          setUpComingData((prevUpcomingData: any) => [
            ...prevUpcomingData,
            ...data.results,
          ]);
          setIsCurrent(currentLang.value);
        } else {
          console.error("upcoming çağrısı başarısız: Veri boş veya tanımsız.");
        }
      }
    );
  }, [currentLang.value]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setX(x + 1);
  //     console.log("======>>>");
  //     if (currentLang.value === "tr") {
  //       currentLang.value = "en";
  //     } else {
  //       currentLang.value = "tr";
  //     }
  //   }, 2500);
  // }, [x]);

  // if (isLoadingAllMovies) {
  //   return <div>Loading...</div>;
  // }

  return (
    <MainLayout movieList={done}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
        }}
      >
        {isCurrent === "tr" ? (
          <Movie movieList={movies} tvList={tvShows} upcoming={upcomingData} />
        ) : (
          <Movie movieList={movies} tvList={tvShows} upcoming={upcomingData} />
        )}
      </Box>
    </MainLayout>
  );
}

export default Home;
