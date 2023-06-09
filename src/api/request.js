import * as interceptor from './interceptor.js'

const baseUrl = 'http://aios.sco.tudb.work/api/aiso'

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
