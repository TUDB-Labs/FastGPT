import * as interceptor from './interceptor.js'

// 官网基础接口 pv
let baseUrl = process.env.VUE_APP_WEBSITE_SERVER
// 法律咨詢
let lawBaseUrl = process.env.VUE_APP_LAW_SERVER
// 买车咨询
let buyCarBaseUrl = process.env.VUE_APP_BUYCAR_SERVER

export const getIp = () => {
  const url = process.env.VUE_APP_IP_SERVER
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

// 获取验证码
export const getVerCode = (data) => {
  const url = baseUrl + `/api/sms/genRandom`;
  return interceptor.post(url,data)
}


export const chatToRobot = (data) => {
  const url = baseUrl + `/api/chat`;
  return interceptor.post(url,data)
}

// 通验证码登录
export const loginByCode = (data) => {
  const url = baseUrl + `/api/sms/insertCheck`;
  return interceptor.post(url,data)
}
// 法律
// 点赞
// 喝倒彩
export const likeLaw = ({msgId, userId}) => {
  const url = lawBaseUrl + `/api/like?msgId=${msgId}&userId=${userId}`;
  return interceptor.post(url)
}
export const dissLaw = ({msgId, userId}) => {
  const url = lawBaseUrl + `/api/diss?msgId=${msgId}&userId=${userId}`;
  return interceptor.post(url)
}

// 买车咨询
export const getBuyCar = (data) => {
  const url = buyCarBaseUrl + `/texttosql/completions`;
  return interceptor.post(url, data)
}

// 车辆咨询点赞
export const carLikeOrDiss = ({record, id}) => {
  const url = buyCarBaseUrl + `/upvote?id=${id}&record=${record}`;
  return interceptor.get(url)
}

// pdf上传文件
export const uploadPdf = (data) => {
  const url = 'https://gztz.idmakers.cn/passapi/file-server/files';
  return interceptor.post(url, data)
}

//分析文档
export const downloadDocument = (data) => {
  const url = '/document/url_download';
  return interceptor.post(url, data)
}

//分析文档
export const analyzeDocument = (data) => {
  const url = '/document/analyze';
  return interceptor.post(url, data)
}

// 获取对话列表
export const getConversationList = (data) => {
  const url = '/conversation/list';
  return interceptor.post(url, data)
}
// 创建对话
export const createConversation = (data) => {
  const url = '/conversation/create';
  return interceptor.post(url, data)
}
// 删除对话
export const deleteConversationDetails = (data) => {
  const url = '/conversation/delete';
  return interceptor.post(url, data)
}
// 保存对话
export const saveConversationDetails = (data) => {
  const url = '/conversation/save';
  return interceptor.post(url, data)
}
// 获取对话内容
export const getConversationDetails = (data) => {
  const url = '/conversation/create';
  return interceptor.post(url, data)
}
// 清空对话内容
export const clearConversationDetails = (data) => {
  const url = '/conversation/clear';
  return interceptor.post(url, data)
}

// 获取分享链接
export const getShareInfo = ({uuid}) => {
  const url = '/share/' + uuid;
  return interceptor.post(url)
}