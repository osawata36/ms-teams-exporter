// HOME画面
// チーム一覧を表示します
<template>
  <div>
    <v-row column justify-center align-center>
      <v-col xs12 sm8 md6>
        <div v-if="noValidToken">
          有効なTOKENを設定してください
        </div>
        <h3>チームリスト</h3>
        参加チーム数： {{ numberOfTeams }}

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search..."
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row column justify-center align-center>
      <v-col xs12 sm8 md6>
        <v-data-table
          :loading="false"
          :headers="headers"
          :items="teams"
          :items-per-page="100"
          :search="search"
        >
          <template v-slot:item._name="{ item }">
            <nuxt-link :to="`teams/${item._id}`">{{ item._name }}</nuxt-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import Team from '~/model/team'
import { tokenStore, teamsStore } from '~/store'

type Data = {
  exporting: boolean
  headers: any
  search: string
}
type Member = {
  id: string
  displayName: string
  userPrincipalName: string
  department: string
}

export default Vue.extend({
  /**
   * asyncDataを使うことで、非同期処理を実行して結果をSSRすることができる
   */
  // async asyncData(ctx: Context): Promise<void> {
  //   const { store } = ctx

  //   // TOKENが設定されていればリクエスト送信
  //   if (tokenStore.token === '') {
  //     // console.log('TOKENがないのでリクエストスキップ')
  //     return
  //   }
  //   // チーム一覧を取得
  //   // const resData: any = await api.getTeams()
  //   await teamsStore.fetchTeams()

  //   // console.log(resData.value)
  // },
  async fetch({store,params}) {

    // TOKENが設定されていればリクエスト送信
    if (tokenStore.token === '') {
      console.log('TOKENがないのでリクエストスキップ')
      return
    }
    // チーム一覧を取得
    await teamsStore.fetchTeams()
    console.log('チーム一覧を取得')

  },
  data(): Data {
    return {
      exporting: false as boolean,
      headers: [
        { text: 'チーム名', value: '_name' },
        { text: 'id', value: '_id' }
      ],
      search: ''
    }
  },
  computed: {
    teams(): Team[] {
      // TODO ストアからgetterでアクセスするとredefinedエラー発生するので直接メンバーにアクセスしている
      const teams: Team[] = teamsStore.teams
      console.log(teams)
      return teams
    },
    numberOfTeams(): number {
      return this.teams ? this.teams.length : 0
    },
    noValidToken(): boolean {
      return tokenStore.token === '' || tokenStore.token === undefined
    },
    token(): string {
      return tokenStore.token
    }
  },
  watch: {
    async token(val, old) {
      if (val !== '') {
        // チーム一覧を取得
        await teamsStore.fetchTeams()
      }
      console.log('watch')
    }
  },
  methods: {
    onClickRow(data: any) {
      const teamId: string = data.id
      this.$router.push(`teams/${teamId}`)
    },
  }
})
</script>
