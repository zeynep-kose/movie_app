import React, { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Autocomplete,
  Stack,
  InputAdornment,
  Box,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

type SearchProps = {
  movieList: any[];
};

function Search({ movieList }: SearchProps) {
  const theme = useTheme();
  console.log(movieList);
  const handleMovieSearch = (value: any) => {
    console.log("value", value.label);
    let finded_movie = null;
    movieList?.map((movie: any) => {
      if (movie.original_title === value) {
        finded_movie = movie;
        return movie;
      } else {
        return null;
      }
    });
    console.log("Eşleşen film", finded_movie);
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: "20px",
        height: "100%",
        marginLeft: "16rem",
      }}
    >
      <Helmet>
        <title>Search Bar</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "2rem",
          // marginLeft: "2rem",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{
            // margin: "0 auto",
            borderRadius: "30px",
            width: "55rem",
          }}
          options={
            movieList?.map((e) => {
              return {
                id: e.id,
                label: e.title,
              };
            }) as any
          }
          onInputChange={(e, value) => handleMovieSearch(value)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="Search for movies, TV shows..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              // sx={{
              //   "&.MuiAutocomplete-hasPopupIcon.css-116wyny-MuiAutocomplete-root .MuiOutlinedInput-root, .MuiAutocomplete-hasClearIcon.css-116wyny-MuiAutocomplete-root .MuiOutlinedInput-root":
              //     {
              //       borderRadius: "1.7rem",
              //     },
              // }}
            />
          )}
        />
        {/* <img
          src="images/bigPic.png"
          alt="bigPic"
          style={{ width: "95%" }}
        ></img> */}
      </Box>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <NotificationsNoneIcon
          sx={{
            padding: "12px",
            borderRadius: "50%",
            background: "aliceblue",
            fontSize: "4.2rem",
          }}
        />
        <img src="images/profile.svg" alt="profile"></img>
      </Box>
    </Stack>
  );
}

export default Search;
