import Login from './Components/Login/Login.jsx'
import Landing from './Components/Landing/Landing.jsx'
import LandingMain from './Components/Landing/LandingMain';
import Signup from './Components/Signup/Signup.jsx'
import Home from './Components/Home/Home.jsx'
import MovieDetailsPage from './Components/Movie/MovieDetailsPage.jsx'
import WatchPage from './Components/WatchPage/WatchPage';
import PrivateRoute from "./Components/PrivateRoute";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";

import "./App.css"

const router = createBrowserRouter([
    { path: "/", 
      element: <Landing />,
      children:[
        { index: true, element: <LandingMain/>},
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
      ]
    },
    { path: "home", element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute> 
    )}, 
    {path:"movie/:id",element: (
      <PrivateRoute>
        <MovieDetailsPage />
      </PrivateRoute>
    )},
    { path: "watch/:id",element: (
      <PrivateRoute>
        <WatchPage />
      </PrivateRoute> 
    )},

    // { path: "/navbar", element: <Navbar /> },
    // { path: "/banner", element: <Banner /> },
    // { path: "/sections", element: <Sections /> },
    // { path: "/footer", element: <Footer /> },
]);

function App() {
  return (
     <AuthProvider>
    <div className="container">
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  )
}

export default App
