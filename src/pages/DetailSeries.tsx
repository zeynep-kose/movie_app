import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import useLocales from "../locales/useLocales";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getTvSeries } from "../api/api";
import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DetailBottomSeries from "../sections/DetailBottomSeries";

interface IFilter {
  page: number;
  genres: number[];
}

function DetailSeries() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const { id } = useParams();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });
  const [tvShow, setTvShow] = useState<any>();

  useEffect(() => {
    getTvSeries(id)
      .then((data) => {
        setTvShow(data);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // //TOP RATED MOVIES
  const { isLoading: isLoadingTopRated, data: topRatedMovies } = useQuery(
    ["topRatedMovies"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  return (
    <MainLayout movieList={tvShow?.data?.results}>
      <Stack
        sx={{
          height: "100%",
          width: "80%",
          marginLeft: "18rem",
          left: "17%",
        }}
      >
        <Box
          sx={{
            witdh: "100%",
            margin: "1rem  0",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=eoOaKN4qCKw"
            height={"600px"}
            width={"1000px"}
          />
        </Box>
        <DetailBottomSeries
          tvShow={tvShow}
          topRated={topRatedMovies?.data?.results}
        />
      </Stack>
    </MainLayout>
  );
}

export default DetailSeries;
