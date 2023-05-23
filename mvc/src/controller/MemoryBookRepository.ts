import Book from "../model/Book";
import IBookRepository from "../model/IBookRepository";
import BooksData from "./data.json"

type BooksJsonData = {
  id: string;
  title: string;
  author: string;
  gender: string;
  desc: string;
}

export default class MemoryBookRepository implements IBookRepository {
  private _data: Book[]
  
  constructor() {
    const jsonData: BooksJsonData[] = BooksData
    console.log(jsonData)

    this._data = jsonData.map((data) => new Book(
      data.title,
      data.author,
      data.gender,
      data.desc,
      data.id
    ))
  }

  getBook = (id: string) => {
    return this._data.find((elem) => elem.id === id)
  };

  getAllBooks = () => {
    return this._data
  };

  saveBook = (book: Book): void => {
    this._data.push(book)
  };

  deleteBook = (id: string): void => {
    this._data = this._data.filter(elem => elem.id !== id)
  };

  updateBook = (book: Book): void => {
    const indexOfBook = this._data.findIndex(b => b.id === book.id)
    if (indexOfBook === -1)
      throw new Error("Invalid index of edited book.")
    this._data.splice(indexOfBook, 1, book)
  };
  
}