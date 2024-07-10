import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../frontend/hobigowes-app/src/Home'
import SignUp from '../frontend/hobigowes-app/src/SignUp'
import './index.css'
import Home from '../frontend/hobigowes-app/src/Home'
import ProfilePage from '../frontend/hobigowes-app/src/ProfilePage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Homepage from './Homepage'

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
  },
  {
<<<<<<< HEAD
    path: "/home",
    element: <Homepage />
=======
    path: "/profile",
    element: <ProfilePage/>
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
