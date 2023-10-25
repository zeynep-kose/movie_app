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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import useLocales from "../locales/useLocales";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";

type SearchProps = {
  movieList: any[];
};

function Search({ movieList }: SearchProps) {
  const navigate = useNavigate();
  const { currentLang, allLangs, onChangeLang } = useLocales();

  const theme = useTheme();
  console.log(movieList);
  const handleMovieSearch = (value: any) => {
    console.log("value", value.label);
    let finded_movie = null;
    movieList?.map((movie: any) => {
      if (movie.original_title === value) {
        finded_movie = movie;

        navigate(`/details/${finded_movie.id}`);
        return movie;
      }
    });
    console.log("Eşleşen film", finded_movie);
  };

  const handleLanguageChange = (e: any) => {
    onChangeLang(e.target.value);
    console.log(e.target.value);
  };
  return (
    <Stack
      sx={{
        // [theme.breakpoints.up("xl")]: {
        //   width: "63%",
        // },
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: "20px",
        height: "100%",
        marginLeft: "17rem",
        width: "80%",
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
          onChange={(e) => {
            console.log("result", e);
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
            />
          )}
        />
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
        <FormControl
          sx={{ m: 1, backgroundColor: "white", width: "45px" }}
          variant="standard"
        >
          {/* <InputLabel>Lang</InputLabel> */}
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={"lang"}
            onChange={handleLanguageChange}
            placeholder="lang"
            label="lang"
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
