import Book from "./Book";

export default interface IBookRepository {
  getBook: (id: string) => Book | undefined
  getAllBooks: () => Book[]
  saveBook: (book: Book) => void
  deleteBook: (id: string) => void
  updateBook: (book: Book) => void
}