import { useState } from "react"
import { bookInventory } from "../api/Book"
const AllBooksViewModel = () => {
  const [bookList, setBookList] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const limit = 10
  const getAllBooks = async () => {
    setLoading(true)
    const response = await bookInventory.getAllBooks()
    if (response && response.data) {
      setBookList(response.data)
    }
    setLoading(false)
  }

  const indexOfLastBook = page * limit
  const indexOfFirstBook = indexOfLastBook - limit
  const currentBooks = bookList?.slice(indexOfFirstBook, indexOfLastBook) || []
  const totalPages = Math.ceil((bookList?.length || 0) / limit)

  const filteredBooks = bookList.filter((book) => {
    const q = search.toLowerCase()
    return (
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q) ||
      book.subject?.toLowerCase().includes(q) ||
      book.gradeLevel?.toLowerCase().includes(q) ||
      book.series?.toLowerCase().includes(q)
    )
  })
  const paginatedFilteredBooks = search
    ? filteredBooks.slice((page - 1) * limit, page * limit)
    : []

  const filteredTotalPages = search
    ? Math.ceil(filteredBooks.length / limit)
    : 0

  return {
    getAllBooks,
    bookList,
    search,
    setSearch,
    filteredBooks,
    currentBooks,
    page,
    totalPages,
    setPage,
    paginatedFilteredBooks,
    filteredTotalPages,
    loading,
  }
}

export default AllBooksViewModel
