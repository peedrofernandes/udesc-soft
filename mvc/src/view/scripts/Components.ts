import Book from "../../model/Book";
import "../styles.scss"

type GridItemSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export default class Components {
  private static _editIconSvgPath = "M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
  private static _deleteIconSvgPath = "M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
  private static _plusIconSvgPath = "M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
  private static _defaultIconSize = 24

  private static _generateComponentFromString(componentString: string): Element {
    const tempContainer = document.createElement("div")
    tempContainer.innerHTML = componentString

    if (tempContainer.children.length <= 0 || !tempContainer.firstElementChild)
      throw new Error("Invalid component string provided.")
  
    const component = tempContainer.firstElementChild
    tempContainer.removeChild(component)
    return component
  }

  private static _generateStringFromComponent(component: Element): string {
    return component.outerHTML
  }

  private static _createIconComponent
    (classList: string, svgPathD: string, size: number, color: string): HTMLSpanElement {
    const editIconString = `
      <span class="${classList}">
        <svg xmlns="http://www.w3.org/2000/svg" height="${size}" width="${size}" viewBox="0 96 960 960">
          <path fill="${color}" d="${svgPathD}"/>
        </svg>
      </span>
    `

    return this._generateComponentFromString(editIconString) as HTMLSpanElement
  }

  static createBookComponent(book: Book): HTMLLIElement
  {
    const editIcon = this._createIconComponent(`edit ${book.id}`, this._editIconSvgPath, this._defaultIconSize, "#111414")
    const deleteIcon = this._createIconComponent(`delete ${book.id}`, this._deleteIconSvgPath, this._defaultIconSize, "crimson")


    const liString = `
      <li class="book">

        <div class="book-main-data">
          <div class="book-title-author-gender">
            <h2>${book.title}</h2>
            <p>${book.gender}, ${book.author}</p>
          </div>
        </div>

        <div class="book-desc">
          <p>${book.desc}</p>
        </div>

        <div class="icons">
          ${this._generateStringFromComponent(editIcon)}
          ${this._generateStringFromComponent(deleteIcon)}
        </div>

      </li>
    `

    return this._generateComponentFromString(liString) as HTMLLIElement
  }

  static createGridComponent(tag: string, children?: Element): HTMLDivElement
  {
    const gridString = `
      <div class="grid-viewport">
        <${tag} class="grid">
          ${children && this._generateStringFromComponent(children)}
        </${tag}>
      </div>
    `

    return this._generateComponentFromString(gridString) as HTMLDivElement
  }

  static createGridItemComponent(classList: string, children?: Element): HTMLDivElement
  {
    const gridItemString = `<div class="grid-item ${classList}"}></div>`
    const gridItem = this._generateComponentFromString(gridItemString) as HTMLDivElement
    if (children) gridItem.appendChild(children)

    return gridItem
  }

  static createAddBookComponent(): HTMLLIElement
  {
    const addIcon = this._createIconComponent("add", this._plusIconSvgPath, 32, "#111414")


    const liString = `
      <li class="book add">
        ${this._generateStringFromComponent(addIcon)}
      </li>
    `

    return this._generateComponentFromString(liString) as HTMLLIElement
  }

  static createModalComponent(height: number): HTMLDivElement
  {
    if (height < 1 || height > 3)
      throw new Error("Invalid modal height.")

    const modalBox = this._generateComponentFromString(
      `<div id="modal-box" class="height${height}"><div>`
    )
    const gridItem = this.createGridItemComponent("isolated", modalBox)
    const modalBoxInsideGrid = this.createGridComponent("div", gridItem)
  
    const modalString = `
      <div id="modal-background" class="hidden">
        ${this._generateStringFromComponent(modalBoxInsideGrid)}
      </div>
    `

    return this._generateComponentFromString(modalString) as HTMLDivElement
  }

  static createTitle(value: number, text: string) {
    if (value < 1 || value > 6) throw new Error("Invalid title value!")

    const titleString = `<h${value}>${text}</h${value}>`

    return this._generateComponentFromString(titleString)
  }

  static createInput(type: string, id: string, label: string)
  {
    const inputString = `
      <div class="input">
        <label for="${id}">${label}</label>
        <input type="${type}" id="${id}" name="${id}" placeholder="${label}">
      </div>
    `

    return this._generateComponentFromString(inputString)
  }

  static createSubmitButton(text: string): HTMLButtonElement
  {
    const buttonString = `
      <button type="submit">
        ${text}
      </button>
    `

    return this._generateComponentFromString(buttonString) as HTMLButtonElement
  }
}