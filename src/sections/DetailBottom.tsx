import React from "react";
import { Stack, Box, ListItem, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tvSeriesData, upcomingApi } from "../api/api";

type detailBottomProps = {
  details: any;
  topRated: [];
};

function DetailBottom({ details, topRated }: detailBottomProps) {
  // const pullDay = details?.results
  //   ?.slice(0, 1)
  //   .map((item: any) => dayjs(item?.release_date).year());
  // console.log("pullDay", pullDay);

  return (
    <Stack
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        paddingBottom: "1.5rem",
      }}
    >
      <Box sx={{ height: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#E8E8E8",
            display: "flex",
            flexDirection: "column",
            rowGap: ".8rem",
          }}
        >
          <p style={{ display: "flex", columnGap: "1rem" }}>
            <span>{details?.original_title}</span>
            {/* {pullDay} */}
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "2rem", width: "70%" }}>
            {details?.overview}
          </p>
        </Typography>
      </Box>
      <Box sx={{ width: "90%", height: "100%" }}>
        <Accordion sx={{ backgroundColor: "black;" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "grey" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "grey" }}
            >
              Awards 9 nominations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* {topRated?.filter((item: any) => item.vote_average > 8)} */}
              {topRated
                ?.filter((item: any) => item.vote_average > 8)
                .slice(0, 9)
                .map((item: any, index) => (
                  <ListItem
                    sx={{ color: "grey", fontSize: "1.2rem" }}
                    key={index}
                  >
                    {item.title}
                  </ListItem>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
}

export default DetailBottom;
