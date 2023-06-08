import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { ITokenState } from './type'
// import Post from '~/models/Post'

@Module({
  name: 'token',
  stateFactory: true,
  namespaced: true,
})
export default class Token extends VuexModule implements ITokenState {
  private _token: string = ''
  private _refleshToken: string = ''

  @Mutation
  public setToken(token: string) {
    this._token = token
  }

  @Mutation
  public setRefleshToken(token: string) {
    this._refleshToken = token
  }

  // @Action({ rawError: true })
  // async loadtoken() {
  //   const token = await fetchtoken()
  //   token.forEach((post) => {
  //     this.addPost(post)
  //   })
  // }
  // @Action({ rawError: true })
  // public setToken(token: string): void {
  //   this._setToken(token)
  // }

  public get token() {
    return this._token
  }

  public get refleshToken() {
    return this._refleshToken
  }
}
