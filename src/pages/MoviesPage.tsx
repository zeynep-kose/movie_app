import { Stack, Box, Container } from "@mui/material";
import { allMovies, tvSeriesData, upcomingApi } from "../api/api";
import useLocales from "../locales/useLocales";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
import MovieList from "../sections/MovieList";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}

function Movies() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  //ALL FILMS
  // const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
  //   ["allMovies", filter, currentLang.value, onChangeLang],
  //   () =>
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=${currentLang.value}&page=${filter.page}&sort_by=popularity.desc&with_genres=${filter.genres}`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     ),
  //   {
  //     onSuccess: (allData) => {
  //       setTotalPages(allData.data.total_pages);
  //     },
  //   }
  // );
  useEffect(() => {
    allMovies(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          console.log("allmovies Data: ", data);
          setMovies(data?.results);
          setTotalPages(data?.total_pages);
          console.log("filterPageeee", filter.page);
        } else {
          console.error("allmovies çağrısı başarısız: Veri boş veya tanımsız.");
        }
      }
    );
  }, [setFilter, filter.genres, filter.page, currentLang.value]);
  return (
    <MainLayout movieList={movies ?? []}>
      <Box
        sx={{
          display: "flex",
          paddingTop: "1.5rem",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {!movies ? (
          <Box sx={{ width: "100%", height: "100%", marginLeft: "19rem" }}>
            Loading...
          </Box>
        ) : (
          <MovieList
            movieList={movies ?? []}
            curentPage={filter.page}
            setpage={(page) => setFilter({ ...filter, page: page })}
            total={totalPages}
          />
        )}
        <Box>
          <RightSideBar
            genres={filter.genres}
            setGenres={(genres) => setFilter({ ...filter, genres: genres })}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Movies;
