import { useEffect } from "react"
import InventoryViewModel from "./ViewModel"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
import NavBar from "../components/NavBar"
export default function View() {
  const {
    image,
    fileInputRef,
    onDrop,
    onFileChange,
    openFileDialog,
    onCapture,
    setImage,
    bookForm,
    loading,
    onFormChange,
    handleFile,
    saveBook,
    saveStatus,
    setBookForm,
    defaultBook,
    error,
    setError,
    setSaveStatus,
  } = InventoryViewModel()
  const triggerCamera = () => {
    fileInputRef.current?.click()
  }
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile()
          if (file) {
            handleFile(file)
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => {
      window.removeEventListener("paste", handlePaste)
    }
  }, [])
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
    if (saveStatus && saveStatus.includes("success")) {
      const timer = setTimeout(() => setSaveStatus(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error, setError, saveStatus, setBookForm, defaultBook])
  return (
    <>
      <NavBar />
      {error && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {saveStatus && (
        <div
          className={`absolute top-10 left-1/2 transform -translate-x-1/2 ${
            saveStatus.includes("success")
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          } px-4 py-3 rounded z-50`}
        >
          <span className="block sm:inline">{saveStatus}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row  items-center relative min-h-screen bg-dotted-pattern bg-cover">
        <div className="flex flex-col items-center gap-2 w-full md:w-[50%]">
          <div className="flex flex-col w-[75%] max-w-xs">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-center">
                Upload image
              </h2>
              <p className="text-sm text-gray-500 text-center mb-4">
                Select and upload the book image of your choice
              </p>

              <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed cursor-pointer border-gray-400 rounded-lg w-full max-w-md p-8 flex flex-col items-center justify-center gap-2  hover:bg-gray-100 transition-colors"
                onClick={openFileDialog}
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10 pointer-events-none">
                    <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                  </div>
                )}
                {image && !loading ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : !loading ? (
                  <span className="text-gray-400"></span>
                ) : null}
                <>
                  {(!image || loading) && (
                    <>
                      <CloudUploadOutlinedIcon className="h-30 w-20 text-gray-400" />
                      <p className="font-medium">
                        Choose a file or drag & drop it here
                      </p>
                      <p className="text-sm text-gray-500">
                        JPEG, JPG or PNG, formats, up to 10MB
                      </p>
                    </>
                  )}
                </>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-xs">
            {!image && (
              <button
                className="bg-primary-500 cursor-pointer rounded-lg mt-2"
                onClick={triggerCamera}
              >
                <p className="text-white font-semibold text-md">
                  Take a picture
                </p>
                <input
                  type="file"
                  accept="*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={onCapture}
                />
              </button>
            )}
          </div>

          <div className="flex flex-col w-full max-w-xs">
            {image && (
              <button
                className="bg-primary-500 mt-2 text-white font-semibold"
                onClick={() => {
                  setImage(null)
                  setBookForm(defaultBook)
                }}
              >
                Retake Image
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-[50%] py-0 md:py-3 pl-[5%] max-w-lg ">
          {bookForm && (
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                saveBook()
              }}
            >
              <h3 className="font-semibold text-xl">Edit Book details</h3>
              <div className="gap-1 ">
                <p className="text-xs text-gray-600 font-semibold">Title</p>
                <div className=" border-[1px] border-gray-200 rounded-md py-1 px-1 bg-transparent">
                  <input
                    name="title"
                    value={bookForm.title}
                    onChange={onFormChange}
                    placeholder="Enter Title"
                    required
                    className="text-md w-full focus:ring-0 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="gap-1 ">
                <p className="text-xs text-gray-600 font-semibold">Author</p>
                <div className=" border-[1px] border-gray-200 rounded-md py-1 px-1 ">
                  <input
                    name="author"
                    value={bookForm.author}
                    onChange={onFormChange}
                    placeholder="Enter Author"
                    required
                    className="text-md w-full focus:ring-0 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="gap-1 ">
                <p className="text-xs text-gray-600 font-semibold">
                  Grade Level
                </p>
                <div className=" border-[1px] border-gray-200 rounded-md py-1 px-1 ">
                  <input
                    name="gradeLevel"
                    value={bookForm.gradeLevel}
                    onChange={onFormChange}
                    placeholder="Enter Grade Level"
                    className="text-md w-full focus:ring-0 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="text-xs text-gray-600 font-semibold">Subject</p>
                <div className="border-[1px]  border-gray-200 rounded-md py-1 px-1 w-full">
                  <textarea
                    name="subject"
                    value={bookForm.subject}
                    onChange={onFormChange}
                    placeholder="Enter Subject"
                    maxLength={200}
                    rows={5}
                    className="text-md w-full focus:ring-0 focus:outline-none border-none resize-none bg-transparent"
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {0 + (bookForm.subject?.length || 0)}/200
                  </div>
                </div>
              </div>

              <div className="gap-1 ">
                <p className="text-xs text-gray-600 font-semibold">Series</p>
                <div className=" border-[1px] border-gray-200 rounded-md py-1 px-1 ">
                  <input
                    name="series"
                    value={bookForm.series}
                    onChange={onFormChange}
                    placeholder="Enter Series"
                    className="text-md w-full focus:ring-0 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary-500 mt-2 text-white font-semibold"
                disabled={loading}
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
