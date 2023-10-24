import React from "react";
import { useTheme } from "@mui/material/styles";
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
import useLocales from "../locales/useLocales";
import RightSideBarBottom from "../components/RightSideBarBottom";
import MovieList from "../sections/MovieList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import MoviesPage from "./MoviesPage";
import { number } from "yup";
import TvList from "../sections/TvList";
import UpcomingList from "../sections/UpcomingList";
import { Context } from "react";

interface IFilter {
  page: number;
  genres: number[];
}
function UpcomingPage() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });
  // const theme = useTheme();
  // const context = useContext(MyContext);

  const [totalPages, setTotalPages] = useState(1);
  // const [filterIds, setFilterIds] = useState<number[]>([]);

  //Upcoming
  const { isLoading: isLoadingUpcoming, data: Upcoming } = useQuery(
    ["Upcoming", filter, currentLang.value, onChangeLang],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?language=${currentLang.value}&page=${filter.page}&with_genres=${filter.genres}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      ),
    {
      onSuccess: (Upcoming) => {
        setTotalPages(Upcoming?.data.total_pages);
      },
    }
  );

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

  if (isLoadingUpcoming) {
    return <div>Loading...</div>;
  }

  //console.log("2.apidengelen:", genreNames);

  // const type = genreIds.map((item: any) => {
  //   const names = item.map((typeId: any) => {});
  // });
  // console.log("Genre Names Array:", type);

  return (
    <Stack sx={{}}>
      <Search movieList={Upcoming?.data?.results ?? []} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
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
          {/* <RightSideBarBottom /> */}
        </Box>
        {isLoadingUpcoming ? (
          <div>Loading...</div>
        ) : (
          <UpcomingList
            movieList={Upcoming?.data?.results ?? []}
            curentPage={filter.page}
            setpage={(page: number) => setFilter({ ...filter, page: page })}
            total={totalPages}
          />
        )}
      </Box>
    </Stack>
  );
}

export default UpcomingPage;
