import { useEffect } from "react"
import InventoryViewModel from "./ViewModel"
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
  } = InventoryViewModel()
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

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded-lg w-64 h-40 flex items-center justify-center cursor-pointer "
        onClick={openFileDialog}
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="max-h-36 max-w-full object-contain"
          />
        ) : (
          <span>Drag & Drop or Click to Upload</span>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileChange}
        />
      </div>
      <label className="btn btn-primary cursor-pointer">
        <span>Capture from Camera</span>
        <input
          type="file"
          accept="*"
          capture="environment"
          style={{ display: "none" }}
          onChange={onCapture}
        />
      </label>
      {image && (
        <button
          className="btn btn-secondary mt-2"
          onClick={() => setImage(null)}
        >
          Remove Image
        </button>
      )}
      {bookForm && (
        <form
          className="flex flex-col gap-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault()
            saveBook()
          }}
        >
          <input
            name="title"
            value={bookForm.title}
            onChange={onFormChange}
            placeholder="Title"
            required
          />
          <input
            name="author"
            value={bookForm.author}
            onChange={onFormChange}
            placeholder="Author"
            required
          />
          <input
            name="gradeLevel"
            value={bookForm.gradeLevel}
            onChange={onFormChange}
            placeholder="Grade Level"
          />
          <input
            name="subject"
            value={bookForm.subject}
            onChange={onFormChange}
            placeholder="Subject"
          />
          <input
            name="series"
            value={bookForm.series}
            onChange={onFormChange}
            placeholder="Series"
          />
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            Save
          </button>
          {saveStatus && <div>{saveStatus}</div>}
        </form>
      )}
    </div>
  )
}
