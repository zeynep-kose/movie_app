import React from "react";
import { Checkbox } from "@mui/material";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Stack,
  Box,
  Link,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

function RightSideBar() {
  return (
    <Stack sx={{ display: "flex", alignSelf: "end" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "end",
          width: "19rem",
          rowGap: "1rem",
        }}
      >
        <Typography
          component={Link}
          sx={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link sx={{ color: "red", fontSize: "1.5rem" }} underline="none">
            Services
          </Link>
          <Link
            sx={{ fontSize: ".9rem", color: "#666666", fontWeight: "bold" }}
            underline="none"
          >
            Uncheck all{" "}
          </Link>
        </Typography>
        <Card
          sx={{
            borderRadius: "1.5rem",
            // backgroundColor: "#191919",
            width: "100%",
            background: "red",
          }}
        >
          <CardContent>
            <List>
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Netflix
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Prime video
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Disney +
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  HBO max
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Hulu
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Starz
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
            </List>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

export default RightSideBar;
