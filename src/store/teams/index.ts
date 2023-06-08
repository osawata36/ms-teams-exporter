import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Team from '~/model/team'
import api from '~/api'
dayjs.extend(utc)

export interface ITeamsState {
  teams: Team[]
  setTeams(teams: Team[]): void
}

@Module({
  name: 'teams',
  stateFactory: true,
  namespaced: true,
})
export default class Teams extends VuexModule implements ITeamsState {
  _teams: Team[] = []
  _lastUpdated: string = dayjs().format()

  @Mutation
  setTeams(teams: Team[]) {
    this._teams = teams
  }

  @Mutation
  setUpdated(datetime: string) {
    this._lastUpdated = datetime
  }

  public get teams() {
    return this._teams
  }

  @Action({ rawError: true })
  public async fetchTeams() {
    // データが古くない場合はキャッシュされたデータを利用する
    const diff = dayjs().diff(this._lastUpdated, 'minute')
    console.log(diff)
    // if (diff < 60) {
    if (diff < 0) {
      console.log('キャッシュしたTeamリストを表示します')
      return
    }

    const resData: any = await api.getTeams()
    if (resData.value === undefined) {
      console.log('データ取得エラー')
      return
    }

    const teams = resData.value.map((item: any) => {
      return new Team({ id: item.id, name: item.displayName })
    })
    // console.log('fetched teams: %O', teams)
    this.setTeams(teams)
    this.setUpdated(dayjs().format())
  }
}
