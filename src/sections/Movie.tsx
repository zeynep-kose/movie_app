import React from "react";
import {
  TextField,
  Autocomplete,
  Stack,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

type movieProps = {
  movieList: any[];
  // setPhoto: React.Dispatch<React.SetStateAction<any[]>>;
};

function Movie({ movieList }: movieProps) {
  return (
    <Stack>
      <Box>
        <img
          src="images/bigPic.png"
          alt="bigPic"
          style={{ width: "95%" }}
        ></img>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
        }}
      >
        <Typography variant="h4">Trending</Typography>
        <Box
          sx={{
            display: "flex",
            width: "95%",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {movieList.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <div className="swiper mySwiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">Slide 1</div>
                      <div className="swiper-slide">Slide 2</div>
                      <div className="swiper-slide">Slide 3</div>
                      <div className="swiper-slide">Slide 4</div>
                      <div className="swiper-slide">Slide 5</div>
                      <div className="swiper-slide">Slide 6</div>
                      <div className="swiper-slide">Slide 7</div>
                      <div className="swiper-slide">Slide 8</div>
                      <div className="swiper-slide">Slide 9</div>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                  <Card sx={{ width: "15rem", height: "12rem" }}>
                    <CardMedia>
                      <img
                        alt="img-1"
                        src={
                          "https://image.tmdb.org/t/p/w500${item.poster_path"
                        }
                      ></img>
                    </CardMedia>
                  </Card>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}

export default Movie;
