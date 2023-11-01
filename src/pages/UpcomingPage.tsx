import React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
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
import { allMovies, tvSeriesData, upcomingApi } from "../api/api";
interface IFilter {
  page: number;
  genres: number[];
}
function UpcomingPage() {
  const [upcomingData, setUpComingData] = useState<any>();
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    upcomingApi(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          console.log("upcoming Data: ", data);
          setUpComingData(data.results);
          setTotalPages(data?.total_pages);
        } else {
          console.error("upcoming çağrısı başarısız: Veri boş veya tanımsız.");
        }
      }
    );
  }, [setFilter, filter.genres, filter.page, currentLang.value]);

  if (!upcomingData) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout movieList={upcomingData ?? []}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
          margin: "0 auto",
        }}
      >
        <UpcomingList
          movieList={upcomingData ?? []}
          curentPage={page}
          setpage={(page: number) => setFilter({ ...filter, page: page })}
          total={totalPages}
        />
      </Box>
    </MainLayout>
    // <Stack sx={{}}>
    //   <Search  />

    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       alignItems: "flex-start",
    //       paddingTop: "1.5rem",
    //       margin: "0 auto",
    //     }}
    //   >
    //     {/* <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "baseline",
    //         paddingRight: "1rem",
    //         rowGap: "2rem",
    //       }}
    //     >
    //       <RightSideBar
    //         genres={filter.genres}
    //         setGenres={(genres) => setFilter({ ...filter, genres: genres })}
    //       />
    //     </Box> */}
    //     <UpcomingList
    //       movieList={upcomingData ?? []}
    //       curentPage={page}
    //       setpage={(page: number) => setFilter({ ...filter, page: page })}
    //       total={totalPages}
    //     />
    //   </Box>
    // </Stack>
  );
}

export default UpcomingPage;
