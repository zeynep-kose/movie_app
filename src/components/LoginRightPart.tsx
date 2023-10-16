import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
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
import "swiper/css";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

type LoginProps = {
  movies: any[];
};

SwiperCore.use([Navigation, Pagination]);

function LoginRightPart({ movies }: LoginProps) {
  if (!movies) {
    return null;
  }

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      lg={1}
      sx={{
        display: "flex",
        // flexWrap: "wrap",
        width: "50%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Swiper
          // install Swiper modules
          spaceBetween={40}
          slidesPerView={1}
          navigation={true}
          style={{
            // width: "900px",

            height: "100%",
          }}
        >
          {movies.map((item, index) => {
            return (
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "100vh",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  alt="img-1"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                ></img>
                <Box
                  sx={{
                    position: "absolute",
                    left: "5%",
                    bottom: "10%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.9rem",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item?.original_title}
                  </Typography>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Grid>
  );
}

export default LoginRightPart;
