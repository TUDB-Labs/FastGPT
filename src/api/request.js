import * as interceptor from './interceptor.js'

const baseUrl = 'http://aios.sco.tudb.work/api/aiso'
const lawBaseUrl = 'https://legal.sco.tudb.work'

export const getIp = () => {
  const url = "https://api.ipify.org?format=json";
  return interceptor.get(url)
}

export const insertPvVu = (data) => {
  const url = baseUrl + "/insertPvVu";
  return interceptor.post(url, data)
}

export const insertSolution = (data) => {
  const url = baseUrl + "/insertSolution";
  return interceptor.post(url, data)
}

export const insertClickrecord = (data) => {
  const url = baseUrl + "/insertClickrecord";
  return interceptor.post(url, data)
}

// 点赞
// 喝倒彩
export const likeLaw = ({msgId, userId}) => {
  const url = lawBaseUrl + `/api/like?msgId=${msgId}&userId=${userId}`;
  return interceptor.post(url, null, 'application/x-www-form-urlencoded')
}
export const dissLaw = ({msgId, userId}) => {
  const url = lawBaseUrl + `/api/diss?msgId=${msgId}&userId=${userId}`;
  return interceptor.post(url, null, 'application/x-www-form-urlencoded')
}
