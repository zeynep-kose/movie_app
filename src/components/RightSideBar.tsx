import React from "react";
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

type RightSideBarProp = {
  filterIds: any[];
  setFiltered: (value: number[]) => void;
};

function RightSideBar({ filterIds, setFiltered }: RightSideBarProp) {
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
  // console.log(genresData?.data?.genres);
  // console.log("dataaaaaaaaaaaaaağ", filterIds);

  const handleCheck = (id: number) => {
    // const filterItems = filterIds.filter((item: number) => {});
    setFiltered([...filterIds, id]);
  };

  return (
    <Stack sx={{ display: "flex", alignSelf: "end" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "end",
          width: "19rem",
          rowGap: "1rem",
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
          <Link sx={{ color: "red", fontSize: "1.5rem" }} underline="none">
            Categories
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
            background: "red",
          }}
        >
          <CardContent>
            <List>
              {genresData?.data?.genres?.slice(0, 6)?.map((genre: any) => (
                <ListItem key={genre.id}>
                  <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                    {genre.name}
                    <Divider />
                  </ListItemText>
                  <ListItemIcon>
                    <Checkbox onClick={() => handleCheck(genre.id)}></Checkbox>
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
