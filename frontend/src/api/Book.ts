import { Server } from "./utils/axios";
import { API_GET_BOOKS } from "../constants/strings";
const server = new Server();
export class BookInventory {
  //get books
  async getBooks(): Promise<any> {
    const endpoint = API_GET_BOOKS;
    return server.get(endpoint);
  }
}
export const bookInventory = new BookInventory();
