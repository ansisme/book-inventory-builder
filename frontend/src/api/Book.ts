import { Server } from "./utils/axios"
import {
  API_GET_BOOKS,
  API_EXTRACT_BOOK,
  API_USER,
  API_SAVE_BOOK,
} from "../constants/strings"
const server = new Server()
export class BookInventory {
  constructor() {}

  //get books
  async getBooks(): Promise<any> {
    const endpoint = API_GET_BOOKS
    return server.get(endpoint)
  }

  // Extract book details from image
  async extractBookDetails(file: File): Promise<any> {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const endpoint = `${API_USER}/${API_EXTRACT_BOOK}`
      const response = await server.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response
    } catch (error: any) {
      throw error
    }
  }
  async saveBookDetails(bookData: any): Promise<any> {
    const endpoint = `${API_USER}/${API_SAVE_BOOK}`
    const data = { ...bookData }
    try {
      const response = await server.post(endpoint, data)
      return response
    } catch (error: any) {
      console.log("Error saving book:", error)
      throw error
    }
  }
}
export const bookInventory = new BookInventory()
