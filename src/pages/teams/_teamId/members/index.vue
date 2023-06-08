<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h3>チームの参加ユーザー一覧</h3>
      ユーザー数： {{ members.length }}
      <CmdButton caption="CSVダウンロード" @click="downloadCSV"></CmdButton>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ユーザー名</th>
              <th class="text-left">user-id</th>
              <th class="text-left">Email</th>
              <th class="text-left">事業場</th>
              <th class="text-left">部門</th>
              <!-- <th class="text-left">所属</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in members" :key="item.id">
              <td>{{ item.displayName }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.userPrincipalName }}</td>
              <td>{{ getCompany( item.department) }}</td>
              <td>{{ getDep(item.department) }}</td>
              <!-- <>{{ item.department }}</> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import api from '~/api'

// 人物
// https://graph.microsoft.com/v1.0/me/people/?$select=displayName,userPrincipalName,department&$filter= id eq 'ohmori.motoji@jp.panasonic.com'

type Data = {
  exporting: boolean
  members: any
}
type Member = {
  id: string
  displayName: string
  userPrincipalName: string
  department: string
}
type AsyncData = {
  // items: string[]
}
export default Vue.extend({
  async created() {
    const TEAM_ID = this.$route.params.teamId
    const resData: any = await api.getMembersOfTeam(TEAM_ID)

    this.members = resData 

  },
  data(): Data {
    return {
      exporting: false as boolean,
      members: [] as any[]
    }
  },
  methods: {
    getCompany(dep:string): string {
      if(dep==null){
        return ''
      }

      return dep
    },
    getDep(dep:string):string{
     return dep==null? '': dep
    },
    /**
     * データをCSVファイルでダウンロードします
     */
    downloadCSV() {
      const filename = 'メンバーリスト.txt'
      const bom = new Uint8Array([0xef, 0xbb, 0xbf])

      try {
        // @ts-ignore
        const csvData = this.members
          .map((item: Member) => {
            return (
              item.id +
              ',' +
              item.displayName +
              ',' +
              item.userPrincipalName +
              ',' +
              this.getCompany(item.department) + 
              ',' +
              this.getDep(item.department)
            )
          })
          .join('\r\n')
        // console.log(csvData)

        const blob = new Blob([bom, csvData], { type: 'text/csv' })

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, filename)
          // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
          window.navigator.msSaveOrOpenBlob(blob, filename)
        } else {
          // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
          // に処理させる
          const link = document.createElement('a')
          link.setAttribute('href', window.URL.createObjectURL(blob))
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      } finally {
        this.exporting = false
      }
    },
    depSplit(strWithSpace: string) {
      return strWithSpace.split('　')
    }
  }
})
</script>
