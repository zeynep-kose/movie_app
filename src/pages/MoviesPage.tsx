import { Box } from "@mui/material";
import { allMovies } from "../api/api";
import useLocales from "../locales/useLocales";
import { useState, useEffect } from "react";
import RightSideBar from "../components/RightSideBar";
import MovieList from "../sections/MovieList";
import MainLayout from "../layouts/MainLayout";

interface IFilter {
  page: number;
  genres: number[];
}

function Movies() {
  const { currentLang } = useLocales();
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });

  const [time, setTime] = useState(500);
  useEffect(() => {
    setTime(time + 100);
  }, [time]);

  useEffect(() => {
    allMovies(currentLang.value, filter.page, filter.genres).then(
      (data: any) => {
        if (data) {
          setMovies(data?.results);
          setTotalPages(data?.total_pages);
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
