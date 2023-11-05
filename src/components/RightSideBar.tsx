import { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";
import { Card, CardContent, Typography, Stack, Box, Link } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { genresApi } from "../api/api";

interface IRightSideBar {
  genres: number[];
  setGenres: (genres: number[]) => void;
}

const RightSideBar = ({ genres, setGenres }: IRightSideBar) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genresData, setGenresData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await genresApi();

        if (response) {
          setGenresData(response);
        }
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu: ", error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return (
    <Stack
      sx={{
        display: "flex",
        alignSelf: "start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "start",
          width: "19rem",
          rowGap: "1rem",
          paddingRight: "1rem",
          height: "38rem",
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
          <ListItem
            sx={{ overflowY: "scroll", justifyContent: "space-between" }}
          >
            <Link
              sx={{ color: "#E8E8E8", fontSize: "1.5rem" }}
              underline="none"
            >
              Categories
            </Link>
            <Link
              sx={{ fontSize: ".9rem", color: "#666666", fontWeight: "bold" }}
              underline="none"
              onClick={() => setGenres([])}
            >
              Uncheck all{" "}
            </Link>
          </ListItem>
        </Typography>
        <Box sx={{ overflowY: "scroll" }}>
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
                {genresData.genres?.map((genre: any) => {
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
