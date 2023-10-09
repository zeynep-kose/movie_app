import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Stack,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
type Props = {
  movieList: string[]; // Dizi prop'u
};
function Search({ movieList }: Props) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
        paddingTop: "40px",
        paddingRight: "20px",
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        sx={{
          // margin: "0 auto",
          borderRadius: "30px",
          width: "50rem",
          backgroundColor: "#212121",
        }}
        options={movieList}
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
      <Box
        sx={{
          width: "15%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NotificationsNoneIcon
          sx={{
            padding: "12px",
            borderRadius: "50%",
            background: "red",
            fontSize: "2rem",
          }}
        />
        <img src="profile.svg" alt="profile"></img>
      </Box>
    </Stack>
  );
}

export default Search;
