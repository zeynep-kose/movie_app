import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import useLocales from "../locales/useLocales";
import MainLayout from "../layouts/MainLayout";
import { getMovieDetails, topRatedFilms } from "../api/api";
import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DetailBottom from "../sections/DetailBottom";

interface IFilter {
  page: number;
  genres: number[];
}

function DetailMovies() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const [details, setDetails] = useState<any>();
  const theme = useTheme();
  const { id } = useParams();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    genres: [],
  });
  const [topRated, setTopRated] = useState<any>();

  // let x = useParams();
  // console.log("x=>", x);

  useEffect(() => {
    getMovieDetails(id, currentLang.value)
      .then((data) => setDetails(data))
      .catch((error) => console.error(error));
  }, [id, currentLang.value]);

  useEffect(() => {
    topRatedFilms()
      .then((data) => setTopRated(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <MainLayout movieList={topRated?.results}>
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
        <DetailBottom details={details} topRated={topRated?.results} />
      </Stack>
    </MainLayout>
  );
}

export default DetailMovies;
