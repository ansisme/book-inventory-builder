import "./App.css"
import View from "./Inventory/View"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeView from "./Home/HomeView"
import { AllBooksView } from "./BookStore/AllBooksView"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/book-inventory" element={<View />} />
          <Route path="/all-books" element={<AllBooksView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
