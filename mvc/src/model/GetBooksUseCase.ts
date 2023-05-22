import Book from "./Book";
import IBookRepository from "./IBookRepository";

export default class GetBooksUseCase {
  constructor(
    private _bookRepository: IBookRepository
  ) {}

  execute(): Book[] {
    return this._bookRepository.getAllBooks() || []
  }
}