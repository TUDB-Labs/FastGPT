// import * as $axios from './$axios.js'

export default ($axios) => {
  console.log(process.env.VUE_APP_GAS_SERVER)
  // 官网基础接口 pv
  // 牙医咨詢
  let yayiBaseUrl = process.env.VUE_APP_DENTIST_SERVER
  // 法律咨詢
  let lawBaseUrl = process.env.VUE_APP_LAW_SERVER
  // 买车咨询
  let buyCarBaseUrl = process.env.VUE_APP_BUYCAR_SERVER
  // 天然气
  let gasBaseUrl = process.env.VUE_APP_GAS_SERVER
  return {
    getIp: () => {
      const url = 'https://ipv4.icanhazip.com/' // process.env.VUE_APP_IP_SERVER
      return $axios.get(url)
    },
    
    insertPvVu: (data) => {
      const url = "/api/aios/insertPvVu";
      return $axios.post(url, data)
    },
    
    insertSolution: (data) => {
      const url = "/api/aios/insertSolution";
      return $axios.post(url, data)
    },
    
    insertConsultingSolutions: (data) => {
      const url = "/api/aios/consultingSolutions";
      return $axios.post(url, data)
    },
    
    insertClickrecord: (data) => {
      const url = "/api/aios/insertClickrecord";
      return $axios.post(url, data)
    },
    
    // 获取验证码
    getVerCode: (data) => {
      const url = `/api/sms/genRandom`;
      return $axios.post(url,data)
    },
    
    
    chatToRobot: (data) => {
      const url = `/api/chat`;
      return $axios.post(url,data)
    },
    
    // 通验证码登录
    loginByCode: (data) => {
      const url = `/api/user/login`;
      return $axios.post(url,data)
    },
    
    // 牙医
    // 点赞
    likeYayi: ({msgId, userId}) => {
      const url = yayiBaseUrl + `/api/like?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    },
    // 踩
    dissYayi: ({msgId, userId}) => {
      const url = yayiBaseUrl + `/api/diss?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    },
    
    // 法律
    // 点赞
    // 喝倒彩
    likeLaw: ({msgId, userId}) => {
      const url = lawBaseUrl + `/api/like?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    },
    dissLaw: ({msgId, userId}) => {
      const url = lawBaseUrl + `/api/diss?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    },
    
    // 买车咨询
    getBuyCar: (data) => {
      const url = buyCarBaseUrl + `/texttosql/completions`;
      return $axios.post(url, data)
    },
    
    // 车辆咨询点赞
    carLikeOrDiss: ({record, id}) => {
      const url = buyCarBaseUrl + `/upvote?id=${id}&record=${record}`;
      return $axios.get(url)
    },
    
    //分析文档
    downloadDocument: (data) => {
      const url = '/api/pdf/document/url_download';
      return $axios.post(url, data)
    },
    
    //分析文档
    analyzeDocument: (data) => {
      const url = '/api/pdf/document/analyze';
      return $axios.post(url, data)
    },
    
    // 获取对话列表
    getConversationList: (data) => {
      const url = '/api/pdf/conversation/list';
      return $axios.post(url, data)
    },
    // 创建对话
    createConversation: (data) => {
      const url = '/api/pdf/conversation/create';
      return $axios.post(url, data)
    },
    // 删除对话
    deleteConversationDetails: (data) => {
      const url = '/api/pdf/conversation/delete';
      return $axios.post(url, data)
    },
    // 保存对话
    saveConversation: (data) => {
      const url = '/api/pdf/conversation/save';
      return $axios.post(url, data)
    },
    // 修改对话名称
    renameConversation: (data) => {
      const url = '/api/pdf/conversation/rename';
      return $axios.post(url, data)
    },
    // 获取对话内容
    getConversationDetails: (data) => {
      const url = '/api/pdf/conversation/messages';
      return $axios.post(url, data)
    },
    // 清空对话内容
    clearConversationDetails: (data) => {
      const url = '/api/pdf/conversation/clear';
      return $axios.post(url, data)
    },
    
    // 获取分享链接
    getShareInfo: (data) => {
      const url = '/api/pdf/share/create';
      return $axios.post(url, data)
    },
    
    // 获取分享文档
    getShareDocInfo: (data) => {
      const url = '/api/pdf/share/get';
      return $axios.post(url, data)
    },

    // 通过文件地址上传
    uploadPdfByUrl: (data) => {
      const url = baseUrl + '/api/pdf/document/url_download';
      return $axios.post(url, data)
    },

    // 天然气
    getGasData: (data) => {
      const url = gasBaseUrl + '/getdata'
      return $axios.post(url, data)
    },
    // 点赞
    likeGas: ({msgId, userId}) => {
      const url = gasBaseUrl + `/like?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    },
    // 踩
    dissGas: ({msgId, userId}) => {
      const url = gasBaseUrl + `/diss?msgId=${msgId}&userId=${userId}`;
      return $axios.post(url)
    }
  }
}