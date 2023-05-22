import Book from "../../model/Book";
import "../styles.scss"

export default class Components {
  private static _editIconSvgPath = "M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
  private static _deleteIconSvgPath = "M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
  private static _plusIconSvgPath = "M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
  private static _defaultIconSize = 24

  private static _createIconComponent(svgPathD: string, size: number, color: string): string {
    const editIconString = `
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" height="${size}" width="${size}" viewBox="0 96 960 960">
          <path fill="${color}" d="${svgPathD}"/>
        </svg>
      </span>
    `

    return editIconString
  }

  static createBookComponent(book: Book): string
  {
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
          ${this._createIconComponent(this._editIconSvgPath, this._defaultIconSize, "#111414")}
          ${this._createIconComponent(this._deleteIconSvgPath, this._defaultIconSize, "crimson")}
        </div>

      </li>
    `

    return liString
  }

  static createGridComponent(tag: string, children?: string): string
  {
    return `
      <${tag} class="grid">
        ${children}
      </${tag}>
    `
  }

  static createGridItemComponent(span: number, children?: string): string
  {
    return `
      <div class="grid-item s${span}">
        ${children}
      </div>
    `
  }

  static createAddBookComponent(): string
  {
    const liString = `
      <li class="book add">
        ${this._createIconComponent(this._plusIconSvgPath, 32, "#111414")}
      </li>
    `

    return liString
  }
}