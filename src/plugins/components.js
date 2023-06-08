import Vue from 'vue'

// componentsファイルにあるグローバルにしたいコンポーネントをimport
import OkButton from '~/components/atoms/OkButton'
import CancelButton from '~/components/atoms/CancelButton'
import CmdButton from '~/components/atoms/CmdButton'

// コンポーネント名をつけて登録。
Vue.component('OkButton', OkButton)
Vue.component('CancelButton', CancelButton)
Vue.component('CmdButton', CmdButton)
