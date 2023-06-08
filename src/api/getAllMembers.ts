import request from '~/utils/httpRequest'
// import { setTimeout } from 'timers/promises'

/**
 * すべてのメンバー一覧を返します
 */
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getALlMembers() {
  const path = `/users`
  const query =
    '?select=id,displayName,userPrincipalName,department,accountEnabled&top=999'

  const response = await request.get(path + query, {
    headers: { ConsistencyLevel: 'eventual' },
    data: {},
  })
  let nextLink: string = response['@odata.nextLink']

  let members = response.value

  while (nextLink !== undefined) {
    await sleep(3000)
    const response = await request.getByFullURI(nextLink)
    nextLink = response['@odata.nextLink']
    members = members.concat(response.value)
  }

  console.log('members:%O', members)
  return members
}
export default getALlMembers
