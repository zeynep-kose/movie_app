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
    <Stack sx={{ width: "17rem" }}>
      <Box>
        <Typography
          component={Link}
          sx={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link sx={{ color: "red" }} underline="none">
            Categories
          </Link>
          <Link sx={{ color: "red" }} underline="none">
            Uncheck all{" "}
          </Link>
        </Typography>
        <Card sx={{ borderRadius: "1.5rem" }}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Action
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Adventure
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Animated
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Comedy
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Crime
                </ListItemText>
                <ListItemIcon>
                  <Checkbox></Checkbox>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText sx={{ color: "White", fontWeight: "bold" }}>
                  Fantasy
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
