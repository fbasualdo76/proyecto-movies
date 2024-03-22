import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/pages/home/Home"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/proyecto-movies" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
