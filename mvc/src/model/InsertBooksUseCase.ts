import Book from "./Book";
import IBookRepository from "./IBookRepository";

export default class InsertBooksUseCase {
  constructor(
    private _bookRepository: IBookRepository
  ) {}

  execute(book: Book): void {
    return this._bookRepository.saveBook(book)
  }
}