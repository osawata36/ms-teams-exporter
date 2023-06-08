import request from '~/utils/httpRequest'
import util from '~/utils/util'

/**
 * 指定チャネルのメッセージ一覧（返信含まない）を返します
 * @param  {string} teamId チームID
 * @param  {string} channelId チャネルID
 */
async function getMessages(teamId: string, channelId: string):Promise<any> {
  const path = `/teams/${teamId}/channels/${channelId}/messages/delta`
  const query = ''

  const response = await request.get(path + query)
  console.log(response)
  let nextLink: string = response['@odata.nextLink']
  let deltaLink: string = response['@odata.deltaLink']
  let messages = response.value

  while (nextLink !== undefined) {
    console.log('messagesにnextLinkあり')
    await util.sleep(Math.random() * 1000 + 100)
    const response = await request.getByFullURI(nextLink)
    console.log(response)
    nextLink = response['@odata.nextLink']
    messages = messages.concat(response.value)
    if (response['@odata.deltaLink']) {
      deltaLink = response['@odata.deltaLink']
      console.log('deltaLinkあり。保存します。%O', deltaLink)
    }
  }

  if (response['@odata.deltaLink']) {
    deltaLink = response['@odata.deltaLink']
    console.log('deltaLinkあり。保存します。%O', deltaLink)
  }

  return { deltaLink, messages }
}
export default getMessages

