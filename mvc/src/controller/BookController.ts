import Book from "../model/Book";
import GetBooksUseCase from "../model/GetBooksUseCase";
import MemoryBookRepository from "./MemoryBookRepository";

export default class BookController {
  private getBooksUseCase: GetBooksUseCase

  constructor() {
    const bookRepository = new MemoryBookRepository()
    this.getBooksUseCase = new GetBooksUseCase(bookRepository)
  }

  handleLoadEvent(): Book[] {
    return this.getBooksUseCase.execute()
  }
}