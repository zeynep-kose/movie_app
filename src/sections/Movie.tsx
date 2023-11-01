import React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, Box, Container, Typography, Grid } from "@mui/material";
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
  tvList: any[];
  upcoming: any[];
  // setPhoto: React.Dispatch<React.SetStateAction<any[]>>;
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Movie({ movieList, tvList, upcoming }: movieProps) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        height: "100%",
        marginLeft: "17rem",
        alignItems: "center",
        paddingBottom: "1rem",
      }}
    >
      <Box sx={{ width: "100%", marginLeft: "2rem" }}>
        <img
          src="images/bigPic.png"
          alt="bigPic"
          style={{ width: "100%" }}
        ></img>
      </Box>
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
                [theme.breakpoints.up("xl")]: {},
                display: "flex",
                // flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  // height: "120px",
                }}
              >
                <Swiper
                  // install Swiper modules
                  spaceBetween={50}
                  slidesPerView={4}
                  style={{
                    // [theme.breakpoints.up("xl")]: {
                    //   width: "1600px",
                    // },
                    flexWrap: "nowrap",
                    width: "1200px",
                    paddingTop: "1.5rem",
                    // paddingRight: "2rem",
                  }} // yada buna he tamm
                >
                  {movieList?.map((item, id) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "250px",
                          height: "305px",
                        }}
                      >
                        <Link to={`/details/movie/${item.id}`}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "1.5rem",
                              objectFit: "fill",
                            }}
                            alt="img-1"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          ></img>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            Upcoming
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
                flexWrap: "nowrap",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "space-between", // buna fix bişi vermen gerekiyor bilgin olsun
                }}
              >
                <Swiper
                  className="homePage--slider"
                  // install Swiper modules
                  spaceBetween={50}
                  slidesPerView={4}
                  style={{
                    flexWrap: "nowrap",
                    width: "1200px",
                    paddingTop: "1.5rem",
                    // paddingRight: "2rem",
                    // [theme.breakpoints.down("xl")]: {
                    //   width: "2000px",
                    // },
                  }}
                >
                  {upcoming?.map((item, index) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "250px",
                          height: "300px",
                          // [theme.breakpoints.down("xl")]: {
                          //   width: "400px",
                          // },
                        }}
                      >
                        <Link to={`/details/upcoming/${item.id}`}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "1.5rem",
                            }}
                            alt="img-1"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          ></img>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            TV Series
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
              xl={1}
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Swiper
                  // install Swiper modules
                  spaceBetween={50}
                  slidesPerView={4}
                  style={{
                    width: "1200px",
                    paddingTop: "1.5rem",
                  }}
                >
                  {tvList?.map((item, id) => {
                    return (
                      <SwiperSlide
                        key={id}
                        style={{
                          width: "100px",
                          height: "300px",
                        }}
                      >
                        <Link to={`/detail/tv/${item.id}`}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "1.5rem",
                            }}
                            alt="img-1"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          ></img>
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
