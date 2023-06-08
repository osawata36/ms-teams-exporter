// ------------------------------------
// チーム情報画面
// チームのチャネル一覧を表示します
// ------------------------------------
<template>
  <div>
    <nuxt-link :to="`${teamId}/members`">メンバー一覧</nuxt-link>
    <v-btn
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="ma-2 white--text"
      @click="downloadAllMessages"
    >
      download all
      <v-icon
        right
        dark
      >
        mdi-cloud-download
      </v-icon>
    </v-btn>
        <v-row column justify-center align-center>
      <v-col xs12 sm8 md6>
        <h3>チャネル</h3>
        チャネル数： {{ numberOfChannels }}

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
          :headers="channelHeaders"
          :items="channels"
          :items-per-page="20"
          :search="search"
          @click:row="onClickRow"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { Context } from '@nuxt/types'
import { channelsStore } from '~/store'
import Channel from '~/model/channel'
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
  // async asyncData(ctx: Context): Promise<void> {
  // },
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
  async created() {
    await channelsStore.fetchChannels(this.teamId)
  },
  methods: {
    onClickRow(channelInfo: any) {
      console.log('channel:' + channelInfo.name + ' id: ' + channelInfo.id)
      this.downloadCSV(this.teamId, channelInfo)
    },
     async downloadAllMessages(){
      this.loading = true
      console.log("donwloadAll")

      // (async() => {
        for(const channel of this.channels){
          if(channel.type!=="private"){
            console.log("downlod: " + channel.name)
            await util.sleep((Math.random() * 1000) + 100)
            this.downloadCSV(this.teamId, channel)
            console.log("end: " + channel.name)
          }
        }
        this.loading = false
  },
    //
    // チャネル内のメッセージをCSV出力
    //
    async downloadCSV(teamId: string, channel: any) {
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
      console.log('CSVエクスポート開始:' + teamId + '/' + channel.id)

      // チャネル内のメッセージをフェッチ
      await channelsStore.fetchChannelMessages({
        teamId,
        channelId: channel.id,
      })

      // ファイルに出力する
      const filename = 'all_' + channel.name + '.json'
      const posts = channelsStore.channel(channel.id)?.posts
      console.log('exportData: %O', posts)

      // --------------------------
      // JSON出力
      // --------------------------
      const jsonData = JSON.stringify(posts)
      const blob = new Blob([bom, jsonData], { type: 'text/json' })
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename)
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
        // に処理させる
        this.fileDownload(blob, filename)
      }

      // --------------------------
      // 投稿csv出力
      // --------------------------
      let postsCsvData: string = ''
      let reactionsCsvData: string = ''
      let repliesCsvData: string = ''

      // csv文字列を作成
      for (const post of posts) {
        postsCsvData += `"${channel.id}","${channel.name}","${post.id}","${post.createdDateTime}","${post.subject}","${post.from.userId}","${post.from.userName}"\n`
        for (const reaction of post.reactions) {
          reactionsCsvData += `"${channel.id}","${channel.name}","${post.id}","${reaction.createdDateTime}","${reaction.reactionType}","${reaction.userId}"\n`
        }

        for (const reply of post.replies) {
          repliesCsvData += `"${channel.id}","${channel.name}","${post.id}","${reply.id}","${reply.createdDateTime}","${reply.from.userId}","${reply.from.userName}"\n`
          for (const reaction of post.reactions) {
            reactionsCsvData += `"${channel.id}","${channel.name}","${reply.id}","${reaction.createdDateTime}","${reaction.reactionType}","${reaction.userId}"\n`
          }
        }
      }

      const postsBlob = new Blob([bom, postsCsvData], { type: 'text/csv' })
      const postsFilename = 'messages_'  + channel.name + '.csv'
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(postsBlob, postsFilename)
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(postsBlob, postsFilename)
      } else {
        this.fileDownload(postsBlob, postsFilename)
      }

      // --------------------------
      // 投稿リアクションcsv出力
      // --------------------------
      const reactionsBlob = new Blob([bom, reactionsCsvData], {
        type: 'text/csv',
      })
      const reactionsFilename =
        'reactions_' + channel.name + '.csv'
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(reactionsBlob, reactionsFilename)
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(reactionsBlob, reactionsFilename)
      } else {
        this.fileDownload(reactionsBlob, reactionsFilename)
      }

      // --------------------------
      // 投稿リプライcsv出力
      // --------------------------
      const repliesBlob = new Blob([bom, repliesCsvData], { type: 'text/csv' })
      const repliessFilename = 'replies_'+ channel.name + '.csv'
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(repliesBlob, repliessFilename)
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(repliesBlob, repliessFilename)
      } else {
        this.fileDownload(repliesBlob, repliessFilename)
      }
    },

    // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
    // に処理させる
    fileDownload(blob: any, filename: string) {
      // 内部的にダウンロードリンクを生成し、ブラウザのダウンロード機能
      // に処理させる
      const link = document.createElement('a')
      link.setAttribute('href', window.URL.createObjectURL(blob))
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
  }
})
</script>
