import React from "react";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import {
  TextField,
  Autocomplete,
  Stack,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import MyContext from "../context/Context";
import { MyContextProvider } from "../context/Context";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
// Import Swiper styles

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type movieProps = {
  movieList: any[];

  // setPhoto: React.Dispatch<React.SetStateAction<any[]>>;
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function Movie({ movieList }: movieProps) {
  const context = useContext(MyContext);
  const movieId = movieList.map((movieType, i) => {
    return movieType.genre_ids;
  });
  console.log("movieeeeee", movieId);
  return (
    <Stack
      sx={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          rowGap: "3rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "2rem",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            Trending
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              lg={1}
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%", // buna fix bişi vermen gerekiyor bilgin olsun
                  // height: "120px",
                }}
              >
                <Swiper
                  // install Swiper modules
                  spaceBetween={40}
                  slidesPerView={4}
                  style={{
                    width: "1000px",
                    paddingTop: "1.5rem",
                    // paddingRight: "2rem",
                  }} // yada buna he tamm
                >
                  {movieList?.map((item, index) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "100px",
                          height: "285px",
                        }}
                      >
                        <Link to={`/details`}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "1.5rem",
                            }}
                            alt="img-1"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          ></img>{" "}
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
}

export default Movie;
