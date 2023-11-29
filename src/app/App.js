import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MovieDetails } from "./components/movie-details/MovieDetails";
// import { Search } from "./pages/search/Search";
// import { WatchList } from "./pages/watch-list/WatchList";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/not found/NotFound";
import { lazyLoad } from "./utilities/lazyLoad";
import { Suspense, lazy } from "react";

// const Search = lazyLoad("../pages/search/Search.tsx", "Search");
// const WatchList = lazyLoad("../pages/watch-list/WatchList.jsx", "WatchList");

const Search = lazy(() =>
  import("./pages/search/Search.tsx").then((module) => ({
    default: module.Search,
  }))
);
const WatchList = lazy(() =>
  import("./pages/watch-list/WatchList.tsx").then((module) => ({
    default: module.WatchList,
  }))
);

function App() {
  return (
    <Router>
      <Navbar />

      <Suspense fallback={<h2>loadingggg ...</h2>}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/movie/:id/:media" element={<MovieDetails />}></Route>
          <Route path="/search/:input" element={<Search />}></Route>
          <Route path="/watchlist" element={<WatchList />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
