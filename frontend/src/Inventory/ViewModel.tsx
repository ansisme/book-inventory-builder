import { useRef, useState } from "react"
import { bookInventory } from "../api/Book"
// import { useParams } from "react-router-dom"
const InventoryViewModel = () => {
  const defaultBook = {
    title: "",
    author: "",
    gradeLevel: "",
    subject: "",
    series: "",
  }
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [bookDetails, setBookDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [bookForm, setBookForm] = useState(defaultBook)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  const extractDetails = async (file: File) => {
    setLoading(true)
    setBookDetails(null)
    setBookForm(defaultBook)

    try {
      const formData = new FormData()

      const res = await bookInventory.extractBookDetails(file)

      const bookData = res.data
      setBookDetails(bookData)
      setBookForm({
        title: bookData.title || "",
        author: bookData.author || "",
        gradeLevel: bookData.gradeLevel || "",
        subject: bookData.subject || "",
        series: bookData.series || "",
      })
    } catch (err) {
      setBookDetails({ error: "Failed to extract details" })
    }

    setLoading(false)
  }

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value })
  }
  const saveBook = async () => {
    setSaveStatus(null)
    try {
      await bookInventory.saveBookDetails(bookForm)
      setSaveStatus("Book saved successfully!")
    } catch {
      setSaveStatus("Failed to save book.")
    }
  }

  const handleFile = (file: File) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }

      reader.readAsDataURL(file)
      extractDetails(file)
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  // Handle camera capture
  const onCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return {
    image,
    fileInputRef,
    handleFile,
    onDrop,
    onFileChange,
    openFileDialog,
    onCapture,
    setImage,
    bookForm,
    loading,
    onFormChange,
    extractDetails,
    bookDetails,
    saveBook,
    saveStatus,
  }
}
export default InventoryViewModel
