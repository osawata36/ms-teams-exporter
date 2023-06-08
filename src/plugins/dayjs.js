import 'dayjs/locale/ja'
import dayjs from 'dayjs'

export default ({ app }, inject) => {
  dayjs.locale('ja')
  inject('dayjs', (string) => dayjs(string))
}
