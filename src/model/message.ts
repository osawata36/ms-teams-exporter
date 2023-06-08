/**
 * 投稿メッセージを表すドメインモデルです
 *
 * @export
 * @class Message
 */
export default class Message {
  private _id: string
  private _createdDateTime: string
  private _from: any
  private _reactions: any
  private _replies: any
  private _webUrl: string

  private _subject: string = ''
  private _content: string = ''

  constructor(params: {
    id: string
    subject: string
    createdDateTime: string
    webUrl: string
    body: { content: string }
    from: { user: { id: string } }
  }) {
    this._id = params.id
    this._subject = params.subject
    this._createdDateTime = params.createdDateTime
    this._webUrl = params.webUrl
    this._content = params.body.content
    this._from = params.from
    // this._writeId = params.from.user.id
  }

  public get id() {
    return this._id
  }

  public get subject() {
    return this._subject
  }

  public get from() {
    return this._from
  }
  
  public get createdDateTime() {
    return this._createdDateTime
  }

  public get content() {
    return this._content
  }
}
