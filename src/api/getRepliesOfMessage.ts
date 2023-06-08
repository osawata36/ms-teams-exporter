import request from '~/utils/httpRequest'
import util from '~/utils/util'

/**
 * 指定チャネルのメッセージ一覧（返信含まない）を返します
 * @param  {string} teamId チームID
 * @param  {string} channelId チャネルID
 * @param  {string} msgId メッセージID
 */
async function getRepliesOfMessage(
  teamId: string,
  channelId: string,
  msgId: string
) {
  const path = `/teams/${teamId}/channels/${channelId}/messages/${msgId}/replies`
  const query = ''
  // const query = '?select=id,displayName,description'
  const response = await request.get(path + query)
  let nextLink: string = response['@odata.nextLink']

  let replies = response.value
  // console.log('nextLink: %O', nextLink)

  while (nextLink !== undefined) {
    await util.sleep(Math.random() * 1000 + 100)
    const response = await request.getByFullURI(nextLink)
    nextLink = response['@odata.nextLink']
    replies = replies.concat(response.value)
  }

  // console.log('replies:%O', replies)
  return replies
}
export default getRepliesOfMessage
