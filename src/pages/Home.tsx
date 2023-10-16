import React from "react";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
import MainLayout from "../layouts/MainLayout";
import RightSideBarBottom from "../components/RightSideBarBottom";
import Movie from "../sections/Movie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const API_Key = `c28667177075291b60900e0a0cb2824e`;

function Home() {
  // const getMovie = () => {
  //   axios

  //     .get(
  //       "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setMovieList(response.data.results);
  //       return response.data;
  //     });
  // };

  // useEffect(() => {
  //   getMovie();
  // }, [movieList]);
  const [filterIds, setFilterIds] = useState<number[]>([]);

  useEffect(() => {}, []);
  //ALL FILMS
  const { isLoading: isLoadingAllMovies, data: allData } = useQuery(
    ["allMovies"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  // console.log("allData:", allData);

  // filtered.filter((e: any[]) => {});

  const genreIds: number[] =
    allData?.data?.results?.map((movie: any) => movie.genre_ids) || [];
  // const filteredArrays = genreIds.filter((e) => {
  //   return filterIds.every((filterIds) => e.includes(filterIds));
  // });
  // console.log("filteredArrays", filteredArrays);
  console.log("Genre IDs:", genreIds);
  // genreIds.filter((e)=>{})
  // const filteredGenreIds = genreIds.filter((genreId) =>
  //   genreId.filter(filterIds)
  // );

  //TYPES
  const { isLoading: isLoadingTrends, data: genresData } = useQuery(
    ["GenresMovies"],
    () =>
      axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
        },
      })
  );
  // console.log("genresData", genresData);
  //TV SERIES
  const { isLoading: isLoadingTv, data: tvSeriesData } = useQuery(
    ["tvSeriesData"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );
  console.log("tvSeriesData", tvSeriesData);

  const { isLoading: isLoadingUpcoming, data: Upcoming } = useQuery(
    ["Upcoming"],
    () =>
      axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
          },
        }
      )
  );

  if (isLoadingAllMovies) {
    return <div>Loading...</div>;
  }

  const genreNames = genresData?.data?.genres.map((item: any) => item);
  //console.log("2.apidengelen:", genreNames);

  // const type = genreIds.map((item: any) => {
  //   const names = item.map((typeId: any) => {});
  // });
  // console.log("Genre Names Array:", type);

  return (
    <MainLayout movieList={allData?.data?.results}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: "1.5rem",
          // justifyContent: "space-between",
        }}
      >
        <Movie
          movieList={allData?.data?.results}
          tvList={tvSeriesData?.data?.results}
          upcoming={Upcoming?.data?.results}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            paddingRight: "1rem",
          }}
        >
          <RightSideBar filterIds={filterIds} setFiltered={setFilterIds} />
          <RightSideBarBottom />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;
