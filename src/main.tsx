import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../frontend/hobigowes-app/src/Home'
import SignUp from '../frontend/hobigowes-app/src/SignUp'
import './index.css'
import Home from '../frontend/hobigowes-app/src/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
