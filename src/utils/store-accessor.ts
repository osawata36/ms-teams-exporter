/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Token from '~/store/token'
import Teams from '~/store/teams'
import Channels from '~/store/channels'

let tokenStore: Token
let teamsStore: Teams
let channelsStore: Channels

/**
 * ストアを初期化する（型推論できるモジュールとして取得する）
 *
 * @param  {Store<any>} store
 * @returns void
 */
function initialiseStores(store: Store<any>): void {
  tokenStore = getModule(Token, store)
  teamsStore = getModule(Teams, store)
  channelsStore = getModule(Channels, store)
}

export { initialiseStores, tokenStore, teamsStore, channelsStore }
