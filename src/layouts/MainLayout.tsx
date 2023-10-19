import React, { ReactNode } from "react";
import Search from "../components/Search";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import { Container, Stack } from "@mui/material";
type HomeLayoutProps = {
  children?: ReactNode;
  movieList: string[];
};
const MainLayout = ({ children, movieList }: HomeLayoutProps) => {
  // const moviSearch = (movieName: string) =>
  //   console.log("searched film:", movieName);
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <LeftSideBar />

      <Stack>
        <Search movieList={movieList} />
        <main>{children}</main>
      </Stack>
    </Stack>
  );
};
export default MainLayout;
