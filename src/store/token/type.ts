// token

export interface ITokenState {
  // private _token: string
  setToken(token: string): void
  token: string

  // private _refleshToken: string
  setRefleshToken(token: string): void
  refleshToken: string
}
