import Popular from "./pages/Popular"
import TopRated from "./pages/TopRated"
import Upcoming from "./pages/Upcoming"
import MovieDetail from "./pages/MovieDetail"
import SearchResults from "./pages/SearchResult"

import { Routes, Route } from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
      <main className="bg-gradient-to-br from-gray-600 via-[#878a8b] to-[#2c3e50]">
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </>
  )
}

export default App
