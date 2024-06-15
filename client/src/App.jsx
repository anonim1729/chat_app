import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Rootlayout from "./layouts/Rootlayout"
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;