import "./App.css"
import View from "./presentation/Inventory/View"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeView from "./presentation/Home/HomeView"
import { AllBooksView } from "./presentation/BookStore/AllBooksView"
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
