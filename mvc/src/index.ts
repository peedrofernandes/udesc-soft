import BookController from "./controller/BookController"
import Components from "./view/scripts/Components"

console.log("Hello, world!")

const bookController = new BookController() 

document.addEventListener("DOMContentLoaded", () => {
  const books = bookController.handleLoadEvent()
  const booksSection = document.getElementById("books")
  
  books.forEach(book => {
    const bookLiString = Components.createBookComponent(book)
    booksSection!.innerHTML += `<div class="grid-item s4">${bookLiString}</div>`
  })

  booksSection!.innerHTML += `
  <div class="grid-item s4">
    ${Components.createAddBookComponent()}
  </div>
  `
})