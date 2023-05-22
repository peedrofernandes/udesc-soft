export default class Book {
  private _id: string
  private _title: string
  private _author: string
  private _gender: string
  private _desc?: string

  constructor(
    title: string,
    author: string,
    gender: string,
    id?: string,
    desc?: string
  ) {
    if (!id)
      this._id = this.generateBookId()
    else
      this._id = id
    
    this._title = title
    this._author = author
    this._gender = gender
    
    if (desc)
      this._desc = desc
  }
  
  private generateBookId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    const length = 32
    const now = Date.now()
    const id: string = Array.from({ length }).join(
      (() => {
        const random = Math.floor(Math.random() * 100)
        const nowFactor = now % 100
        const index = (random + nowFactor) % 32
        const c = characters.charAt(index)
        return c
      })()
    )

    return id
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }
  get author(): string {
    return this._author
  }
  get gender(): string {
    return this._gender
  }
  get desc(): string | undefined {
    return this._desc
  }
}