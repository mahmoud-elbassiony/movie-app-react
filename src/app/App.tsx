import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { NotFound } from "./pages/not found/NotFound";
import { Suspense, lazy, useRef } from "react";
import { Loader } from "./components/loader/Loader";
import { useEffect } from "react";
import ProtectedUserRoutes from "./pages/protectedRoutes/ProtectedUserRoutes";

// const lazyLoad = (path: string, namedExport: string) => {
//   return lazy(() =>
//     import(path).then((module) => ({
//       default: module[namedExport],
//     }))
//   );
// };

// const Search = lazyLoad("./pages/search/Search", "Search");

// const Search = lazy(() =>
//   import("./pages/search/Search").then((module) => ({
//     default: module.Search,
//   }))
// );

const Home = lazy(() => import("./pages/home/Home"));
const MovieDetails = lazy(() => import("./pages/movie-details/MovieDetails"));
const Search = lazy(() => import("./pages/search/Search"));
const WatchList = lazy(() => import("./pages/watch-list/WatchList"));
const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/signUp/SignUp"));

function App() {
  const location = useLocation();
  const searchEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      document.activeElement !== searchEl.current &&
      !location.pathname.includes("search") &&
      searchEl.current !== null &&
      searchEl.current.value !== ""
    ) {
      searchEl.current.value = "";
    }
  }, [location, searchEl]);

  return (
    <>
      <Navbar searchEl={searchEl} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id/:media" element={<MovieDetails />}></Route>
          <Route
            path="/search/:input"
            element={<Search searchEl={searchEl} />}
          ></Route>
          <Route element={<ProtectedUserRoutes />}>
            <Route path="/watchlist" element={<WatchList />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
