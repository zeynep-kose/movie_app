import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: "Home",
  },
  { path: "/login", element: "loginPage" },
]);

export default routes;
