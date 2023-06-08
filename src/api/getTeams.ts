import request from '~/utils/httpRequest'

// baseURL:https://graph.microsoft.com/
// apiRoot:
// path: /beta/me/joinedTeams/

function getTeams() {
  const path = '/me/joinedTeams/'
  return request.get(path)
}
export default getTeams
