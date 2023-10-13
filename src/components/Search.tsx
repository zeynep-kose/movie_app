import React, { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
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
  movieSearch(movieName: string): void;
};

function Search({ movieList, movieSearch }: SearchProps) {
  const handleMovieSearch = (
    e: React.SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string>
  ) => {
    if (value && reason === "selectOption") {
      const isMatch = Object.keys(movieList).filter((movie) => {
        return movie.toLowerCase().includes(value.toLowerCase());
      });
      console.log("match movies:", isMatch);
    }
  };
  return (
    <Stack
      sx={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "80vw",
        paddingTop: "20px",
        height: "auto",
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
            movieList.map((e) => {
              return {
                id: e.id,
                label: e.title,
              };
            }) as any
          }
          // onChange={handleMovieSearch}
          renderInput={(params) => (
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
