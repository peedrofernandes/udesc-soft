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
      data.id,
      data.desc
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
    this._data.filter(elem => elem.id !== id)
  };

  updateBook = (book: Book): void => {
    this._data.filter(elem => elem.id === book.id)
    this._data.push(book)
  };
  
}