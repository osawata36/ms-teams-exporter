import request from '~/utils/httpRequest'
/**
 * 指定チーム内のチャネル一覧を返します
 * @param  {string} teamId チームID
 */
function getChannels(teamId: string) {
  const path = `/teams/${teamId}/channels/`
  const query = '?select=id,displayName,description,membershipType'
  return request.get(path + query)
}
export default getChannels
