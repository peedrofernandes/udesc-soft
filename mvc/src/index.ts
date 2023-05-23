import BookController from "./controller/BookController"
import Components from "./view/scripts/Components"
import UI from "./view/scripts/UI"

console.log("Hello, world!")

const bookController = new BookController() 
const ui = new UI(bookController)

document.addEventListener("DOMContentLoaded", () => {
  ui.appendBookComponents()

  ui.appendModals()

  

  // ui.appendBookFormToModal("create")
})
