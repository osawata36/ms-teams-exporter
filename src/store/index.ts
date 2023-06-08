//
// 本ファイルは基本的に編集不要です。
// storeに新しいモジュールを作成するときは、utils/store-accessor.tsファイルを変更してください。
// https://qiita.com/azukiazusa/items/a50b1ffe05d9937a4db0

import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]
export * from '~/utils/store-accessor'
