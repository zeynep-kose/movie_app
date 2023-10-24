import React, { ChangeEvent, useState, useEffect } from "react";
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
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type SearchProps = {
  movieList: any[];
};

function Search({ movieList }: SearchProps) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

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

  const clickHandle = (event: SelectChangeEvent<"lang">) => {
    console.log("bağannnne");
    const selectedLang = event.target.value as string;
    i18n.changeLanguage(selectedLang);
    // movieList.
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
          width: "20%",
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
        <Link to={"/login"}>
          <img src="images/profile.svg" alt="profile"></img>
        </Link>
        <FormControl sx={{ m: 1, backgroundColor: "white" }} variant="standard">
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={"lang"}
            onChange={clickHandle}
            placeholder="lang"
            // input={<BootstrapInput />}
          >
            <MenuItem value={"en"}>en</MenuItem>
            <MenuItem value={"tr"}>tr</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}

export default Search;
