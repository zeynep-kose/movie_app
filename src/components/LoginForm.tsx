import React from "react";
import * as yup from "yup";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required("E-mail is required !").email("Invalid email"),
  password: yup.string().required("Password is required !"),
});

function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    navigate("/");
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("Form errors:", errors);
  };

  return (
    <Container
      sx={{
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
            padding: "10px",
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
        onSubmit={handleSubmit(onSubmit, onError)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "65%",
          rowGap: "2rem",
          margin: "0 auto",
        }}
      >
        <TextField
          {...register("email")}
          InputProps={{ style: { color: "white" } }}
          color="primary"
          id="email"
          placeholder="E-mail"
          autoComplete="current-password"
          variant="standard"
        />
        {errors.email && (
          <p
            style={{
              color: "red",
              fontSize: "1.5rem",
              textTransform: "capitalize",
            }}
          >
            {errors.email.message}
          </p>
        )}
        <TextField
          {...register("password")}
          InputProps={{ style: { color: "white" } }}
          id="password"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{
            color: "white",
          }}
        />
        {errors.password && (
          <p
            style={{
              color: "red",
              fontSize: "1.5rem",
              textTransform: "capitalize",
            }}
          >
            {errors.password.message}
          </p>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography sx={{ color: "grey" }}>
                Remember me for 30 days
              </Typography>
            }
          />
          <Typography component={Link} to="" sx={{ color: "white" }}>
            Forgot password
          </Typography>
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
          type="submit"
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
            <span style={{ color: "white" }}>Sign up for free</span>
          </Typography>
        </Box>
      </form>
    </Container>
  );
}

export default LoginForm;
