import { useEffect } from "react"
import NavBar from "../components/NavBar"
import AllBooksViewModel from "./AllBooksViewModel"
import Loader from "../components/Loader"
import Card from "../components/Card"
export const AllBooksView = () => {
  const {
    getAllBooks,
    setSearch,
    search,
    // filteredBooks,
    currentBooks,
    page,
    totalPages,
    setPage,
    paginatedFilteredBooks,
    filteredTotalPages,
  } = AllBooksViewModel()
  useEffect(() => {
    getAllBooks()
  }, [])
  const booksToDisplay = search ? paginatedFilteredBooks : currentBooks
  const currentTotalPages = search ? filteredTotalPages : totalPages

  return (
    <div className="">
      <NavBar />
      <div className="ml-3 rounded py-3 px-4 w-full max-w-md border-[1px] border-gray-200 flex mt-6">
        <img
          src="src/assets/icons/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
          className="mr-2"
        />
        <input
          type="text"
          placeholder="Search by title, author, subject, grade or series..."
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={(e) => {
            setSearch(e.target.value)
            if (e.target.value) {
              setPage(1)
            }
          }}
          className="w-full border-0 focus:ring-0 focus:outline-none"
        />
      </div>

      {booksToDisplay && booksToDisplay.length > 0 ? (
        <>
          <ul className="flex flex-wrap">
            {booksToDisplay.map((book, index) => (
              <li key={index} className="p-3 mb-2">
                <Card book={book} />
              </li>
            ))}
          </ul>

          {currentTotalPages > 1 && (
            <div className="flex justify-center mt-4 pb-10">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 mx-1 border rounded disabled:opacity-50 bg-gray-300 hover:bg-primary-500 disabled:hover:text-black hover:text-white font-medium disabled:bg-gray-200 disbaled:border-none focus:ring-0`}
              >
                Previous
              </button>

              {Array.from({ length: currentTotalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 mx-1 border rounded ${
                      page === pageNum
                        ? "bg-primary-500 text-white "
                        : "bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-primary-500 hover:text-white disabled:hover:text-black bg-gray-300 font-medium disabled:bg-gray-200 disbaled:border-none"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  )
}
