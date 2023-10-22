import React from "react";
import { useContext } from "react";
import { Checkbox } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
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
import { ThemeContext } from "@emotion/react";

function RightSideBar() {
  const context = useContext(MyContext);

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

  console.log(isLoadingTrends);

  const handleCheck = (id: number) => {
    if (context?.filterIds.includes(id)) {
      context?.setFilterIds(context?.filterIds.filter((item) => item !== id));
    } else {
      context?.setFilterIds([...context?.filterIds, id]);
    }

    // const isChecked = context?.filterIds.includes(id);
    // if (isChecked) {
    //   context?.setFilterIds(context?.filterIds.filter((item) => item !== id));
    // } else {
    //   context?.setFilterIds([...context?.filterIds, id]);
    // }
    // const filterItems = filterIds.filter((item: number) => {});

    context?.setFilterIds([...context?.filterIds, id]);
  };

  // console.log("dataaaaaaaaaaaaaağ", filterIds);

  // const handleCheck = (id: number) => {
  //   // const filterItems = filterIds.filter((item: number) => {});
  //   setFiltered([...filterIds, id]);
  // };

  return (
    <Stack sx={{ display: "flex", alignSelf: "end", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "end",
          width: "19rem",
          rowGap: "1rem",
          height: "100%",
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
            Services
          </Link>
          <Link
            sx={{ fontSize: ".9rem", color: "#666666", fontWeight: "bold" }}
            underline="none"
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
              {genresData?.data?.genres?.slice(0, 6)?.map((genre: any) => (
                <ListItem key={genre.id}>
                  <ListItemText sx={{ color: "#E8E8E8", fontWeight: "bold" }}>
                    {genre.name}
                    <Divider />
                  </ListItemText>
                  <ListItemIcon>
                    <Checkbox
                      checked={context?.filterIds.includes(genre.id)}
                      onClick={() => handleCheck(genre.id)}
                    ></Checkbox>
                  </ListItemIcon>
                </ListItem>
              ))}
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
}

export default RightSideBar;
