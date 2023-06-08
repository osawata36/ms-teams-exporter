// import axios from 'axios'

import { NuxtAxiosInstance } from '@nuxtjs/axios'

const apiRoot = 'https://graph.microsoft.com/beta'

// このメンバ変数にはNuxtのAxiosモジュールを注入します
let axiosInstance: NuxtAxiosInstance

export function setClient(client: NuxtAxiosInstance) {
  axiosInstance = client
}

export default {
  /**
   * GETリクエストを送信する
   *
   * @param {string} path
   * @param {*} [config={}]
   * @returns
   */
  get(path: string, config = {}) {
    return axiosInstance
      .get(`${apiRoot}${path}`, config)
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
  getByFullURI(path: string, config = {}) {
    return axiosInstance
      .get(path, config)
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
  /**
   * POSTリクエストを送信する
   *
   * @param {string} path
   * @param {*} [config={}]
   * @returns
   */
  post(path: string, config = {}) {
    const fullpath = path.startsWith('http') ? path : apiRoot + path

    return axiosInstance({
      method: 'POST',
      // url: `${apiRoot}${path}`,
      url: fullpath,
      ...config,
    })
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
  /**
   * TOKEN取得POSTリクエストを送信する
   *
   * @param {string} path
   * @returns
   */
  post_token(path: string, body: any) {
    const fullpath = path.startsWith('http') ? path : apiRoot + path

    // console.log('POST_TOKEN: %O', body)

    return axiosInstance
      .post(fullpath, body)
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
  /**
   * PUTリクエストを送信する
   *
   * @param {string} path
   * @param {*} [config={}]
   * @returns
   */
  put(path: string, config = {}) {
    return axiosInstance({
      method: 'PUT',
      url: `${apiRoot}${path}`,
      ...config,
    })
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
  /**
   * DELETEリクエストを送信する
   *
   * @param {string} path
   * @param {*} [config={}]
   * @returns
   */
  delete(path: string, config = {}) {
    return axiosInstance({
      method: 'DELETE',
      url: `${apiRoot}${path}`,
      ...config,
    })
      .then((res: any) => res.data)
      .catch((err: any) => err)
  },
}
