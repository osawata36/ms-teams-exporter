/**
 * チャネルストア
 */

import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import api from '~/api'
import Channel from '~/model/channel'
// import Message from '~/model/message'
import util from '~/utils/util'

export interface IChannelsState {
  channels: Channel[]
}

@Module({
  name: 'channels',
  stateFactory: true,
  namespaced: true,
})
export default class Channels extends VuexModule implements IChannelsState {
  _channels: Channel[] = []

  @Mutation
  setChannels(channels: Channel[]) {
    this._channels = channels
  }

  @Mutation
  setPosts(payload: any) {
    // setPosts(channelId: string, posts: any) {
    const channel: Channel | undefined = this._channels.find(
      (v) => v.id === payload.channelId
    )
    if (channel) {
      console.log('channelにpostsを保持: %O', payload.posts)

      channel.posts = payload.posts
      channel.deltaLink = payload.deltaLink
    } else {
      console.log('Channelが見つかりません。ChannelId = ' + channel)
    }
  }

  public get channels() {
    return this._channels
  }

  public get channel() {
    return (channelId: string) => {
      return this._channels.find((v) => v.id === channelId)
    }
  }

  /**
   * チャネルリスト取得
   * チーム内の全チャネル情報を取得する
   *
   * @param teamId チームID
   */
  @Action({ rawError: true })
  async fetchChannels(teamId: string) {
    this.setChannels([])
    const resData: any = await api.getChannels(teamId)

    console.log('fetched channels: %O', resData.value)
    const channels = resData.value.map((item: any) => {
      return new Channel({
        id: item.id,
        name: item.displayName,
        description: item.description,
        type: item.membershipType,
        teamId,
      })
    })
    // console.log('fetched channels: %O', channels)
    // チャネル一覧をstateに保持する
    this.setChannels(channels)
  }

  /**
   * メッセージリスト取得
   * チーム内の全メッセージ情報を取得する
   *
   * @param {teamId,channelId}
   */
  @Action({ rawError: true })
  async fetchChannelMessages(param: any) {
    const teamId = param.teamId
    const channelId = param.channelId

    console.log('----▼メッセージ取得------' + teamId + ':' + channelId)
    await util.sleep(Math.random() * 1000 + 100)
    const messagesInfo = await api.getMessages(teamId, channelId)
    // const topMessages = messagesInfo.messages
    const topMessages = messagesInfo.messages.filter(
      (msg: any) =>
        msg.messageType !== 'systemEventMessage' &&
        msg.body.content !== null &&
        msg.from.application?.applicationIdentityType !== 'bot'
    )
    const deltaLink = messagesInfo.deltaLink
    console.log(
      '----▲メッセージ取得完了------%O delta:%O',
      topMessages,
      deltaLink
    )

    await util.sleep(Math.random() * 1000 + 100)

    console.log('----▼リプライ取得------' + topMessages.length)
    await Promise.all(
      topMessages.map(async (msg: any) => {
        const replies = await api.getRepliesOfMessage(teamId, channelId, msg.id)
        // console.log('---replies---:%O, %O',replies, replies.length)
        msg.replies = replies.filter(
          (reply: any) =>
            reply.messageType !== 'systemEventMessage' &&
            reply.body.content !== null &&
            reply.from.application?.applicationIdentityType !== "bot"
        )
      })
    )
    console.log('----▲リプライ取得------' + teamId + ':' + channelId)
    console.log('messages: %O', topMessages)

    // 投稿一覧をスリムな形に射影する
    const posts = topMessages.map((msg: any) => {
      const trimedReplies = msg.replies.map((reply: any) => {
        const trimedReactions = reply.reactions.map((reaction: any) => {
          return {
            createdDateTime: reaction.createdDateTime,
            reactionType: reaction.reactionType,
            userId: reaction.user?.user?.id,
          }
        })

        return {
          id: reply.id,
          createdDateTime: reply.createdDateTime,
          from: {
            userId: reply.from?.user?.id,
            userName: reply.from?.user?.displayName,
          },
          webUrl: reply.webUrl,
          content: reply.body.content,
          reactions: trimedReactions,
          // reactions: reply.reactions,
        }
      })

      const trimedReactions = msg.reactions.map((reaction: any) => {
        return {
          createdDateTime: reaction.createdDateTime,
          reactionType: reaction.reactionType,
          userId: reaction.user?.user?.id,
        }
      })
      return {
        // メッセージ情報オブジェクト
        id: msg.id,
        createdDateTime: msg.createdDateTime,
        subject: msg.subject ? msg.subject : 'NO_TITLE',
        from: {
          userId: msg.from?.user?.id,
          userName: msg.from?.user?.displayName,
        },
        webUrl: msg.webUrl,
        content: msg.body.content,
        // reactions: msg.reactions,
        reactions: trimedReactions,
        reactionsCount: trimedReactions?.length,
        replies: trimedReplies,
        repliesCount: trimedReplies?.length,
      }
    })
    // console.log('posts: %O', posts)
    this.setPosts({ channelId, posts, deltaLink })
  }
}
