import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import request, { setClient } from '~/utils/httpRequest'
import util from '~/utils/util'

import { tokenStore } from '~/store'

dayjs.extend(utc)

export default function ({ $axios }) {
  // set timeout
  $axios.defaults.timeout = 40 * 1000

  $axios.onRequest((config) => {
    if (tokenStore.token !== '') {
      config.headers.common.Authorization = 'Bearer ' + tokenStore.token
    }
    return config
  })

  $axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      switch (error.response?.status) {
        case 400: {
          console.log('intercept ERRROR400 ')
          return Promise.reject(error)
        }
        case 401: {
          console.log('intercept ERRROR401')
          return Promise.reject(error)
        }
        case 429: {
          const retryAfter = error.response.headers['Retry-After']
          console.error('Too Many Requests ERROR WAIT :' + retryAfter)
          await util.sleep((retryAfter ?? 5) * 1.5 * 1000)
          return $axios.request(originalRequest)
        }
        default: {
          console.log(error)
        }
      }
    }
  )
  setClient($axios)
}
