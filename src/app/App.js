import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MovieDetails } from "./components/movie-details/MovieDetails";
import { Search } from "./pages/search/Search";
import { WatchList } from "./pages/watch-list/WatchList";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/movie/:id/:media" element={<MovieDetails />}></Route>
        <Route path="//:input" element={<Search />}></Route>
        <Route path="/watchlist" element={<WatchList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
