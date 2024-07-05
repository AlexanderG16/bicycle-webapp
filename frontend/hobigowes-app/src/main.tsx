import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import CreatePost from "./CreatePost";
import ViewPost from "./ViewPost";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./AboutUs";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createpost",
    element: <CreatePost />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/post/:id",
    element: <ViewPost />,
    loader: async ({ params }) => {
      const res = await fetch(`http://localhost:5000/post/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await res.json();
      return resJson;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
