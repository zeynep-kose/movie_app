import axios from "axios";

export const allMovies = async (
  pageNumber: any,
  currentLang: any,
  genres: any
) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?language=${currentLang}&page=${pageNumber}&sort_by=popularity.desc&with_genres=${genres}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
      },
    }
  );
  return response.data.results;
};

export const tvSeriesData = async (currentLang: any) => {
  const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
    params: {
      language: currentLang,
      page: 1,
      sort_by: "popularity.desc",
    },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
    },
  });
  return response.data.results;
};

export const upcomingApi = async (
  currentLang: any,
  pages: any,
  genres: any
) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?language=${currentLang.value}&page=${pages}&with_genres=${genres}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
      },
    }
  );
  return response.data;
};

export const genresApi = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?language=tr`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
      },
    }
  );
};
// / const { isLoading: isLoadingUpcoming, data: Upcoming } = useQuery(
//   //   ["Upcoming", currentLang.value, onChangeLang],
//   //   () =>
//   //     axios.get(
//   //       `https://api.themoviedb.org/3/movie/upcoming?language=${currentLang.value}&page=1`,
//   //       {
//   //         headers: {
//   //           Authorization:
//   //             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg2NjcxNzcwNzUyOTFiNjA5MDBlMGEwY2IyODI0ZSIsInN1YiI6IjY1MjNiMDA3ZmQ2MzAwMDBlMjAxMDgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.en0JNvttI-F-mcNFrKCAQaxe4iMdgNfVWDTDTvGmCA4",
//   //         },
//   //       }
//   //     )
//   // );
