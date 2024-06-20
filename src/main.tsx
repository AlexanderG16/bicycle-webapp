import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SignUp from './SignUp'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Homepage from './Homepage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/home",
    element: <Homepage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
