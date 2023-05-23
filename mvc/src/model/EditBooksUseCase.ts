import Book from "./Book";
import IBookRepository from "./IBookRepository";

export default class EditBooksUseCase {
  constructor(
    private _bookRepository: IBookRepository
  ) {}

  execute(book: Book): void {
    return this._bookRepository.updateBook(book)
  }
}