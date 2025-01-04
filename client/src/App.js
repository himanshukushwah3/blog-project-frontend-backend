import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import DataProvider from "./context/DataProvider";

import Home from "./Components/Home/Home";
import Login from "./Components/Account/Login";
import Header from "./Components/Header/Header";
import PostDetails from "./Components/Details/PostDetails";
import CreateBlog from "./Components/Create/CreateBlog";
import UpdateBlog from "./Components/Create/UpdateBlog";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create-blog"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create-blog" element={<CreateBlog />} />
            </Route>

            <Route
              path="/blog-details/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/blog-details/:id" element={<PostDetails />} />
            </Route>

            <Route
              path="/update-blog/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
            </Route>

            <Route
              path="/about"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>

            <Route
              path="/contact"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
