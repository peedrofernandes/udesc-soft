import Book from "../model/Book";
import EditBooksUseCase from "../model/EditBooksUseCase";
import GetBooksUseCase from "../model/GetBooksUseCase";
import InsertBooksUseCase from "../model/InsertBooksUseCase";
import RemoveBooksUseCase from "../model/RemoveBooksUseCase";
import MemoryBookRepository from "./MemoryBookRepository";

export default class BookController {
  private getBooksUseCase: GetBooksUseCase
  private insertBooksUseCase: InsertBooksUseCase
  private removeBooksUseCase: RemoveBooksUseCase
  private editBooksUseCase: EditBooksUseCase
  private _bookRepository = new MemoryBookRepository()

  constructor() {
    this.getBooksUseCase = new GetBooksUseCase(this._bookRepository)
    this.insertBooksUseCase = new InsertBooksUseCase(this._bookRepository)
    this.removeBooksUseCase = new RemoveBooksUseCase(this._bookRepository)
    this.editBooksUseCase = new EditBooksUseCase(this._bookRepository)
  }

  getBooks(): Book[] {
    return this.getBooksUseCase.execute()
  }

  getBook(id: string): Book | undefined {
    return this._bookRepository.getBook(id)
  }

  createBook(book: Book) {
    return this.insertBooksUseCase.execute(book)
  }

  deleteBook(book: Book) {
    return this.removeBooksUseCase.execute(book)
  }

  updateBook(book: Book) {
    return this.editBooksUseCase.execute(book)
  }
}