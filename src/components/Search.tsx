/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
//import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import useLocales from "../locales/useLocales";
import {
  BrowserRouter,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import axios from "axios";

function Search() {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const navigate = useNavigate();
  const handleMovieSearch = (value: any) => {
    let finded_movie = null;
    options?.map((movie: any) => {
      console.log(movie);
      if (movie.original_title === value) {
        finded_movie = movie;
        navigate(`/details/movie/${finded_movie.id}`);
        return movie;
      }
    });
  };

  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<any[]>([]);

  const fetchMoreData = async (currentLang: any) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=${currentLang}&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      );

      const newOptions = response.data.results;

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      setPage(page + 1);
    } catch (error) {
      console.error("Veriler alınırken bir hata oluştu", error);
    }
  };

  useEffect(() => {
    fetchMoreData(currentLang.value);
  }, [currentLang.value]);

  const handleScroll = (event: any) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      fetchMoreData(currentLang.value);
    }
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
          sx={{
            margin: "0 auto",
            borderRadius: "30px",
            width: "55rem",
          }}
          options={options}
          autoHighlight
          getOptionLabel={(option: any) => option.original_title}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.original_title}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for movies, TV shows..."
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              helperText={`Current page: ${page}`}
            />
          )}
          ListboxProps={{
            onScroll: handleScroll,
          }}
          onInputChange={(e, value) => handleMovieSearch(value)}
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
            // onChange={handleLanguageChange}
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
