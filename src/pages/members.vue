// ------------------------------------
// （暫定）メンバー取得画面
// ------------------------------------
<template>
  <div>
    所属テナントの全ユーザーリストをダウンロードします。<br>
    (時間がかかります)<br>

    <v-btn
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="ma-2 white--text"
      @click="downloadAllMembers"
    >
      download all MEMBERS
      <v-icon
        right
        dark
      >
        mdi-cloud-download
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import api from '~/api'
import util from '~/utils/util'

type Data = {
  teamId: string
  search: string
  loader: any
  loading: boolean
  channelHeaders: any
}
type Member = {
  id: string
  displayName: string
  userPrincipalName: string
  department: string
}
type AsyncData = {
  teams: string[] | null
}
export default Vue.extend({

data(): Data {
    return {
      teamId: this.$route.params.id,
      loader: null,
      loading: false,
      search: '',
      channelHeaders: [
        { text: 'チャネル名', value: 'name' },
        { text: 'team-id', value: 'id' },
      ],
    }
  },
  computed: {
    channels(): Channel[] {
      const channels = channelsStore._channels

      return channels
    },
    numberOfChannels(): number {
      return this.channels.length
    },
  },
  methods: {
     async downloadAllMembers(){
        try{
          this.loading = true
          const resData: any = await api.getALlMembers()

          this.downloadCSV(resData)

          }catch(e){
            console.log(e)
          }finally{
            this.loading =false
          }
          console.log("donwloadAll")

      },
    //
    // CSV出力
    //
    downloadCSV(members) {
      const filename = 'メンバーリスト.csv'
      const bom = new Uint8Array([0xef, 0xbb, 0xbf])

      try {
        // @ts-ignore
        const csvData = members
          .map((item: Member) => {
            return (
              '"'+
              item.id +
              '","' +
              item.displayName +
              '","' +
              item.userPrincipalName +
              '","' +
              item.department
              // this.getCompany( item.department) + 
              // ',' +
              // this.getDep(item.department)
              +'"'
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


  // async downloadCSV(members: any) {
  //     const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
  //     console.log('CSVエクスポート開始:')

  //     // ファイルに出力する
  //     const filename = 'all_members.json'
  //     console.log('exportData: %O', posts)

  //     // --------------------------
  //     // JSON出力
  //     // --------------------------
  //     const jsonData = JSON.stringify(posts)
  //     const blob = new Blob([bom, jsonData], { type: 'text/json' })

  //     if (window.navigator.msSaveBlob) {
  //       window.navigator.msSaveBlob(blob, filename)
  //       // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
  //       window.navigator.msSaveOrOpenBlob(blob, filename)
  //     } else {
  //       // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
  //       // に処理させる
  //       this.fileDownload(blob, filename)
  //     }

  //     // --------------------------
  //     // csv出力
  //     // --------------------------

  //     // csv文字列を作成
  //     for (const member of members) {
  //       postsCsvData += `"${channel.id}","${channel.name}","${post.id}","${post.createdDateTime}","${post.subject}","${post.from.userId}","${post.from.userName}"\n`
  //       for (const reaction of post.reactions) {
  //         reactionsCsvData += `"${channel.id}","${channel.name}","${post.id}","${reaction.createdDateTime}","${reaction.reactionType}","${reaction.userId}"\n`
  //       }

  //     }

  //     const postsBlob = new Blob([bom, postsCsvData], { type: 'text/csv' })
  //     const postsFilename = 'messages_'  + channel.name + '.csv'
  //     if (window.navigator.msSaveBlob) {
  //       window.navigator.msSaveBlob(postsBlob, postsFilename)
  //       // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
  //       window.navigator.msSaveOrOpenBlob(postsBlob, postsFilename)
  //     } else {
  //       this.fileDownload(postsBlob, postsFilename)
  //     }

  //   },

  //   // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
  //   // に処理させる
  //   fileDownload(blob: any, filename: string) {
  //     // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
  //     // に処理させる
  //     const link = document.createElement('a')
  //     link.setAttribute('href', window.URL.createObjectURL(blob))
  //     link.setAttribute('download', filename)
  //     document.body.appendChild(link)
  //     link.click()
  //     link.remove()
  //   },
  }
})
</script>
