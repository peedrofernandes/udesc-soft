import BookController from "../../controller/BookController";
import Book from "../../model/Book";
import Components from "./Components";

export default class UI {
  private _bookController: BookController

  constructor (
    bookController: BookController
  ) {
    this._bookController = bookController
  }

  private _setModalBoxHeight(height: number) {
    const modalBox = document.querySelector("#modal-box")

    if (!modalBox)
      throw new Error("No modal box available at the document.")
    
    console.log(modalBox.classList)
  }

  private _toggleModal() {
    const modalBackground = document.querySelector("#modal-background")
    const modalBox = document.querySelector("#modal-box")
    if (!modalBackground || !modalBox)
      throw new Error("No modal!")

    if (modalBackground.classList.contains("hidden")) {
      modalBackground.classList.remove("hidden")
    } else {
      modalBackground.classList.add("hidden")
      modalBox.innerHTML = ""
    }
  }

  appendBookComponents() {
    const booksSection = document.getElementById("books")
    if (!booksSection)
      throw new Error("Books section not found!")
    
    booksSection.innerHTML = ""

    const books = this._bookController.getBooks()
    books.forEach(book => {
      const bookLi = Components.createBookComponent(book)
      const gridItem = Components.createGridItemComponent("s4", bookLi)
      booksSection.appendChild(gridItem)
    })
    const AddBookComponent = Components.createAddBookComponent()
    booksSection.appendChild(Components.createGridItemComponent("s4", AddBookComponent))

    // Event listener for the add button
    AddBookComponent.addEventListener("click", () => {
      this._toggleModal()
      this.appendBookFormToModal("create")
    })

    // Event listener for edit icons
    const editIcons = document.getElementsByClassName("edit")
    for (let i = 0; i < editIcons.length; i++) {
      const icon = editIcons.item(i)
      icon?.addEventListener("click", () => {
        this._toggleModal()
        this.appendBookFormToModal("update", icon.classList[1])
      })
    }

    const deleteIcons = document.getElementsByClassName("delete")
    for (let i = 0; i < deleteIcons.length; i++) {
      const icon = deleteIcons.item(i)
      icon?.addEventListener("click", () => {
        const book = this._bookController.getBook(icon.classList[1])
        if (!book)
          throw new Error("Error - No book found for the id named by the classList " + icon.classList[1] + ".")
        this._bookController.deleteBook(book)
        this.appendBookComponents()
      })
    }
  }

  appendModals() {
    const modal = Components.createModalComponent(1)
    document.body.appendChild(modal)

    const modalBox = document.querySelector("#modal-box")
    modal.addEventListener("click", (e: MouseEvent) => {
      if (!modalBox?.contains(e.target as Node)) {
        this._toggleModal()
        this.removeElementsFromModal()
      }
    })
  }

  removeElementsFromModal() {
    const modalBox = document.querySelector("#modal-box")
    if (!modalBox) throw new Error("There's no modal box on viewport!")
    modalBox.childNodes.forEach(child => modalBox.removeChild(child))
  }

  appendBookFormToModal(variant: "create" | "update", bookId?: string) {
    const modalBox = document.querySelector("#modal-box")
    if (!modalBox) throw new Error("There's no modal box on viewport!")

    this.removeElementsFromModal()

    this._setModalBoxHeight(1)

    const titleText = variant === "create" ? "Criar novo livro" : "Editar livro"
    const h1 = Components.createTitle(1, titleText)

    // Inputs: Title, Gender, Author, desc
    const iTitle = Components.createInput("text", "title", "Título")
    const iGender = Components.createInput("text", "gender", "Gênero")
    const iAuthor = Components.createInput("text", "author", "Autor")
    const iDesc = Components.createInput("text", "desc", "Descrição")
    const submitButton = Components.createSubmitButton("Enviar")

    const form = document.createElement("form")
    form.appendChild(iTitle)
    form.appendChild(iAuthor)
    form.appendChild(iGender)
    form.appendChild(iDesc)
    form.appendChild(submitButton)

    modalBox.appendChild(h1)
    modalBox.appendChild(form)

    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = new FormData(form)

      const bookData = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        gender: formData.get("gender") as string,
        desc: formData.get("desc") as string
      }

      if (variant === "create") {
        this._bookController.createBook(new Book(
          bookData.title,
          bookData.author,
          bookData.gender,
          bookData.desc
        ))

        this.appendBookComponents()
      } else {
        if (!bookId)
          throw new Error("Update calls must provide an ID")
        const existingBook = this._bookController.getBook(bookId)
        if (!existingBook)
          throw new Error("Book to be edited not found.")
        
        this._bookController.updateBook(new Book(
          bookData.title,
          bookData.author,
          bookData.gender,
          bookData.desc,
          existingBook.id
        ))

        this.appendBookComponents()
      }

      this._toggleModal()

      form.reset()
    })
  }
}