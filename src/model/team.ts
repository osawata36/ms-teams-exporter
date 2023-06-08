/**
 * チームを表すドメインモデルです
 *
 * @export
 * @class Team
 */
import Channel from '~/model/channel'

export default class Team {
  private _id: string
  private _name: string
  private _channels: Channel[] = []

  constructor(params: { id: string; name: string }) {
    this._id = params.id
    this._name = params.name
  }

  public get id() {
    return this._id
  }

  public get name() {
    return this._name
  }

  public get channels() {
    return this._channels
  }

  public set channels(value: Channel[]) {
    this._channels = value
  }
}
