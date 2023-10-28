import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Stack, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
// Import Swiper styles

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type movieProps = {
  movieList: any[];
  curentPage: number;
  setpage: (page: number) => void;
  total: number;
};

function Movie({ movieList, curentPage, setpage, total }: movieProps) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        // [theme.breakpoints.up("xl")]: {
        //   width: "100%",
        // },

        height: "100%",
        alignItems: "center",
        width: "55%",
        marginLeft: "19rem",
        [theme.breakpoints.up("lg")]: {
          width: "57%",
        },
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
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          lg={3}
          sx={{
            // display: "flex",
            // flexWrap: "wrap",

            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                margin: "2rem 0",
                rowGap: "3rem",
                // position: "fixed",
                right: "0",
                // [theme.breakpoints.up("xl")]: {
                //   width: "100%",
                //   // justifyContent: "space-between",
                // },
              }}
            >
              {/* localhost:300/details/movie?=id */}
              {movieList?.map((item, id) => {
                return (
                  <Link key={id} to={`/details/${item.id}`}>
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
                width: "23rem",
                margin: "0 auto ",
              }}
              onChange={(event: React.ChangeEvent<unknown>, page: number) => {
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
          </Box>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Movie;
