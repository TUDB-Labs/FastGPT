import * as interceptor from './interceptor.js'

// 官网基础接口 pv
let baseUrl = ''
// 法律咨詢
let lawBaseUrl = 'https://legal.sco.tudb.work'
// 买车咨询
let buyCarBaseUrl = 'https://car.sco.tudb.work'

if (process.env.NODE_ENV === 'development') {
  // 官网基础接口 pv
  // baseUrl = 'https://aios.sco.tudb.work'
  // 法律咨詢
  // lawBaseUrl = 'https://legal.sco.tudb.work'
}

export const getIp = () => {
  const url = "https://api.ipify.org?format=json";
  return interceptor.get(url)
}

export const insertPvVu = (data) => {
  const url = baseUrl + "/api/aiso/insertPvVu";
  return interceptor.post(url, data)
}

export const insertSolution = (data) => {
  const url = baseUrl + "/api/aiso/insertSolution";
  return interceptor.post(url, data)
}

export const insertClickrecord = (data) => {
  const url = baseUrl + "/api/aiso/insertClickrecord";
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

export const getBuyCar = (data) => {
  const url = buyCarBaseUrl + `/texttosql/completions`;
  return interceptor.post(url, data)
}

export const carLikeOrDiss = ({record, id}) => {
  const url = buyCarBaseUrl + `/upvote?id=${id}&record=${record}`;
  return interceptor.get(url)
}
