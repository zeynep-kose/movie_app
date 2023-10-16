import React from "react";
import * as yup from "yup";
import {
  TextField,
  Autocomplete,
  Stack,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { padding } from "@mui/system";
import { CheckBox } from "@material-ui/icons";
import { Link } from "react-router-dom";

type FormData = {
  Email: string;
  password: any;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed"),
  password: yup.string().required("Password is required"),
});
function LoginForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) =>
    schema
      .validate(data, { abortEarly: false })
      .then((validData) => {
        console.log("Form data is valid:", validData);
      })
      .catch((validationErrors) => {
        console.error("Form validation errors:", validationErrors);
      })
  );

  return (
    <Container
      sx={{
        // height: "100vh",
        width: "50vw",
        margin: "0",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          margin: "0 auto",
          width: "65%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            rowGap: ".5rem",
            letterSpacing: "2px",
          }}
        >
          Welcome back, Olivia
          <span
            style={{
              color: "grey",
              fontSize: "1rem",
              display: "block",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Welcome back! Please enter your details.
          </span>
        </Typography>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            border: "1px solid grey",
            borderRadius: "1rem",
            width: "100%",
            padding: " 10px",
            columnGap: ".5rem",
            textTransform: "capitalize",
            fontSize: "1rem",
            color: "#FEFEFE",
          }}
        >
          <img src="images/loginPage/Google.png" alt="icon" />
          Log in with Google
        </Button>
      </Box>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "65%",
          rowGap: "2rem",
          margin: "0 auto",
        }}
      >
        <TextField
          InputProps={{ style: { color: "white" } }}
          color="primary"
          id="standard-email"
          placeholder="E-mail"
          type="email"
          autoComplete="current-password"
          variant="standard"
        />
        {errors.Email && <p>{errors.Email.message}</p>}
        <TextField
          InputProps={{ style: { color: "white" } }}
          id="standard-password-input"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{
            color: "white",
            // "&.css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
            //   borderBottom: "1px solid white",
            // },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", columnGap: "1rem" }}>
            <CheckBox />
            <Typography sx={{ color: "grey" }}>
              Remember me for 30 days
            </Typography>
          </Box>
          <Box>
            <Typography component={Link} to="" sx={{ color: "white" }}>
              Forgot password
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            backgroundColor: "white",
            width: "95%",
            padding: ".5rem",
            textTransform: "capitalize",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.5rem",
            borderRadius: "1rem",
          }}
          type="button"
          onClick={() => {}}
        >
          Log in
        </Button>
        <Box>
          <Typography
            component={Link}
            to=""
            sx={{
              color: "grey",
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "white" }}>Sign up for free </span>
          </Typography>
        </Box>
      </form>
    </Container>
  );
}

export default LoginForm;
