import React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { tvSeriesData } from "../api/api";
import useLocales from "../locales/useLocales";
import RightSideBar from "../components/RightSideBar";
import MainLayout from "../layouts/MainLayout";
import TvList from "../sections/TvList";
// const API_Key = `c28667177075291b60900e0a0cb2824e`;

interface IFilter {
  page: number;
  genres: number[];
}
function Tvseries() {
  const [tvShows, setTvShows] = useState<any>();
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    tvSeriesData(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          setTvShows(data.results);
          setTotalPages(data?.total_pages);
        } else {
          console.error("upcoming çağrısı başarısız: Veri boş veya tanımsız.");
        }
      }
    );
  }, [setFilter, filter.genres, filter.page, currentLang.value]);

  if (!tvShows) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout movieList={tvShows ?? []}>
      <Box
        sx={{
          display: "flex",
          paddingTop: "1.5rem",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {!TvList ? (
          <Box sx={{ width: "100%", height: "100%", marginLeft: "19rem" }}>
            Loading...
          </Box>
        ) : (
          <TvList
            movieList={tvShows ?? []}
            curentPage={page}
            setpage={(page: number) => setFilter({ ...filter, page: page })}
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

export default Tvseries;
