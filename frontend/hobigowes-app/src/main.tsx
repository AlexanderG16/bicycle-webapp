import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import CreatePost from "./CreatePost";
import ViewPost from "./ViewPost";
import ProfilePage from "./ProfilePage";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./AboutUs";
import EditProfile from "./EditProfile";
import TransactionHistory from "./TransactionHistory";

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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/transaction-history",
    element: <TransactionHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
