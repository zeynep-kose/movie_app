import React from "react";
import { useContext } from "react";
import { Checkbox } from "@mui/material";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Stack,
  Box,
  Link,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MyContext from "../context/Context";

interface IRightSideBar {
  genres: number[];
  setGenres: (genres: number[]) => void;
}

const RightSideBar = ({ genres, setGenres }: IRightSideBar) => {
  const { isLoading: isLoadingTrends, data: genresData } = useQuery(
    ["GenresMovies"],
    async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      );

      console.log("response", res);

      return res || [];
    }
  );

  return (
    <Stack sx={{ display: "flex", alignSelf: "start" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "start",
          width: "19rem",
          rowGap: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Typography
          component={Link}
          sx={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link sx={{ color: "#E8E8E8", fontSize: "1.5rem" }} underline="none">
            Categories
          </Link>
          <Link
            sx={{ fontSize: ".9rem", color: "#666666", fontWeight: "bold" }}
            underline="none"
            onClick={() => setGenres([])}
          >
            Uncheck all{" "}
          </Link>
        </Typography>
        <Card
          sx={{
            borderRadius: "1.5rem",
            // backgroundColor: "#191919",
            width: "100%",
            backgroundColor: "#212121",
          }}
        >
          <CardContent>
            <List>
              {genresData?.data?.genres?.map((genre: any) => {
                const isChecked =
                  genres.findIndex((c) => c === genre.id) !== -1;
                return (
                  <Box>
                    <ListItem
                      key={genre.id}
                      sx={{
                        color: "#E8E8E8",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {genre.name}
                      <Checkbox
                        checked={isChecked}
                        onClick={() => {
                          if (isChecked) {
                            setGenres(genres.filter((c) => c !== genre.id));
                          } else {
                            setGenres([...genres, ...[genre.id]]);
                          }
                        }}
                        // onDoubleClick={handleDoubleClick}
                      ></Checkbox>
                    </ListItem>
                    <Divider sx={{ backgroundColor: "#666666" }} />
                  </Box>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Stack>
    // <>
    //   {!isLoadingTrends ? (

    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </>
  );
};

export default RightSideBar;
