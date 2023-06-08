import request from '~/utils/httpRequest'
/**
 * 指定チーム内のメンバー一覧を返します
 * @param  {string} teamId チームID
 */
async function getMembersOfTeam(teamId: string) {
  const path = `/groups/${teamId}/members`
  const query =
    '?select=id,displayName,userPrincipalName,department,accountEnabled&top=999'

  const response = await request.get(path + query, {
    headers: { ConsistencyLevel: 'eventual' },
    data: {},
  })
  let nextLink: string = response['@odata.nextLink']

  let members = response.value

  while (nextLink !== undefined) {
    const response = await request.getByFullURI(nextLink)
    nextLink = response['@odata.nextLink']
    members = members.concat(response.value)
  }

  // 無効なアカウントは取り除く（退職など）
  const enabledMembers = members.filter((item: any) => {
    return item.accountEnabled === true
  })

  // console.log('members:%O', enabledMembers)
  return enabledMembers
}
export default getMembersOfTeam
