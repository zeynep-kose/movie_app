import React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import useLocales from "../locales/useLocales";
import UpcomingList from "../sections/UpcomingList";
import { upcomingApi } from "../api/api";
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
  );
}

export default UpcomingPage;
