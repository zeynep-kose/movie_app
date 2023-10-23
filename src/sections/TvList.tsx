import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useContext, Dispatch, SetStateAction } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
// Import Swiper styles

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type tvProps = {
  movieList: any[];
  curentPage: number;
  setpage: Dispatch<SetStateAction<number>>;
  total: number;
};

function TvList({ movieList, curentPage, setpage, total }: tvProps) {
  return (
    <Stack
      sx={{
        height: "100%",
        alignItems: "center",
        width: "85%",
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
                height: "100%",
              }}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    margin: "2rem 0",
                    rowGap: "2rem",
                  }}
                >
                  {movieList?.map((item, index) => {
                    return (
                      <Link to={`/details/:${item.id}`}>
                        <img
                          style={{
                            width: "250px",
                            height: "300px",
                            borderRadius: "1.5rem",
                          }}
                          alt="img-1"
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        ></img>{" "}
                      </Link>
                    );
                  })}
                </Box>
                <Pagination
                  page={curentPage}
                  sx={{
                    display: "flex",
                    alignSelf: "center",
                    backgroundColor: "wheat",
                    borderRadius: "1.5rem",
                  }}
                  onChange={(
                    event: React.ChangeEvent<unknown>,
                    page: number
                  ) => {
                    setpage(page);
                  }}
                  count={total}
                  renderItem={(item) => (
                    <PaginationItem
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
}

export default TvList;
