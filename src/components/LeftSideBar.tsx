import React from "react";
import { Stack, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
function LeftSideBar() {
  return (
    <Stack
      sx={{
        backgroundColor: "#212121",
        // height: "100vh",
        width: "15rem",
        paddingTop: "1.5rem",
        borderRadius: "2rem",
        display: "flex",
        position: "fixed",
        zIndex: 1000,
        height: "100%",
      }}
    >
      <Helmet>
        <title>LeftSideBar</title>
      </Helmet>
      <img
        src="images/leftside.svg"
        alt="movie"
        style={{ padding: "0 25px", width: "85%", margin: "0 auto" }}
      ></img>
      <Box sx={{ marginTop: ".6rem" }}>
        <List sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <ListItem
            disablePadding
            sx={{ padding: "10px", "&:hover": { background: "#2c6865" } }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { fontWeight: "bold", color: "#666666" },
                }}
                primary="Home"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ padding: "10px", "&:hover": { background: "#2c6865" } }}
          >
            <ListItemButton>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { fontWeight: "bold", color: "#666666" },
                }}
                primary="Movies"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ padding: "10px", "&:hover": { background: "#2c6865" } }}
          >
            <ListItemButton>
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { fontWeight: "bold", color: "#666666" },
                }}
                primary="TV Series"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ padding: "10px", "&:hover": { background: "#2c6865" } }}
          >
            <ListItemButton>
              <ListItemIcon>
                <UpcomingIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { fontWeight: "bold", color: "#666666" },
                }}
                primary="Upcoming"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ width: "12rem", margin: ".45rem auto" }}>
        <Card
          sx={{
            backgroundColor: "#191919",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "1.5rem",
            padding: "1rem ",
          }}
        >
          <CardMedia sx={{ position: "relative" }}>
            <img
              src="images/cardIcon.svg"
              alt=""
              style={{
                padding: ".5rem",
                backgroundColor: "aliceblue",
                borderRadius: "50%",
              }}
            />
          </CardMedia>
          <CardContent>
            <Typography sx={{ color: "#E8E8E8", fontWeight: "bold" }}>
              Play movie quizes and earn free tickets
              <span
                style={{
                  color: "#666666",
                  fontWeight: "400",
                  marginTop: ".5rem",
                  display: "block",
                }}
              >
                50k people are playing now
              </span>
            </Typography>
          </CardContent>
          <Button
            sx={{
              background: "#276361",
              borderRadius: "2rem",
              padding: ".5rem",
              textTransform: "capitalize",
            }}
          >
            Start playing
          </Button>
        </Card>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", margin: "1rem auto" }}>
        <img src="images/out.svg" alt="logout"></img>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "2rem", color: "#666666" }}
        >
          Log out
        </Typography>
      </Box>
    </Stack>
  );
}

export default LeftSideBar;
