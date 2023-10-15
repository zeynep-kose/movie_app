// import React from "react";
// import { useTheme } from "@mui/material/styles";
// import {
//   TextField,
//   Autocomplete,
//   Stack,
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardHeader,
//   CardActions,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import "swiper/css";
// import "swiper/css/bundle";
// import SwiperCore from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
// import "swiper/swiper-bundle.css";

// function LoginRightPart() {
//   return (
//     <Grid
//       item
//       xs={2}
//       sm={4}
//       md={4}
//       lg={1}
//       sx={{
//         display: "flex",
//         // flexWrap: "wrap",
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%", // buna fix bişi vermen gerekiyor bilgin olsun
//         }}
//       >
//         <Swiper
//           // install Swiper modules
//           spaceBetween={40}
//           slidesPerView={4}
//           style={{
//             width: "900px",
//             paddingTop: "1.5rem",
//             paddingRight: "2rem",
//           }} // yada buna he tamm
//         >
//           {movieList.map((item, index) => {
//             return (
//               <SwiperSlide
//                 style={{
//                   width: "100px",
//                   height: "285px",
//                 }}
//               >
//                 <img
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: "1.5rem",
//                   }}
//                   alt="img-1"
//                   src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                 ></img>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </Box>
//     </Grid>
//   );
// }

// export default LoginRightPart;
