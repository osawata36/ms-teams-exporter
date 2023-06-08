/**
 * チャンネルを表すドメインモデルです
 *
 * @export
 * @class Channel
 */
import Messages from '~/model/message'
export default class Channel {
  private _id: string
  private _name: string
  private _description: string = ''
  private _type: string = ''
  private _teamId: string = ''
  private _posts: Messages[] = []
  private _deltaLink: string = ''

  constructor(params: {
    id: string
    name: string
    description: string
    teamId: string
    type: string
  }) {
    this._id = params.id
    this._name = params.name
    this._description = params.description
    this._type = params.type
  }

  public get id() {
    return this._id
  }

  public get name() {
    return this._name
  }

  public get description() {
    return this._description
  }

  public get type() {
    return this._type
  }

  public get teamId() {
    return this._teamId
  }

  public get posts(){
    return this._posts
  }

  public set posts(value: Messages[])      {
    console.log("set posts: %O", value)
    this._posts = value
  }

  public get deltaLink(){
    return this._deltaLink
  }

  public set deltaLink(value: string){
    console.log("set deltalink: " + value)
    this._deltaLink = value
  }

}
