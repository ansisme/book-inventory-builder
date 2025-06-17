import { Server } from "./utils/axios"
import {
  API_EXTRACT_BOOK,
  API_USER,
  API_SAVE_BOOK,
  API_GET_ALL_BOOKS,
} from "../constants/strings"
const server = new Server()
export class BookInventory {
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
      console.error("Error saving book:", error)
      throw error
    }
  }
  async getAllBooks(): Promise<any> {
    const endpoint = `${API_USER}/${API_GET_ALL_BOOKS}`
    try {
      const response = await server.get(endpoint)
      return response
    } catch (error: any) {
      console.error("Error retrieving book details:", error)
      throw error
    }
  }
}
export const bookInventory = new BookInventory()
