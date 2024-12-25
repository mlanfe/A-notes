const Axios = require('axios')
const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

// 响应拦截器处理数据，接口响应状态正常时数据对象会多一层data包含响应数据
Axios.interceptors.response.use(data => {
  return data
}, error => {
  console.log('响应拦截器事件error', error.response)
  return Promise.reject(error.response)
})

// 接口地址 / 请求参数 / 请求方式 / 请求头信息
const request = (url, params = {}, method = METHODS.GET, headers = {}) => {
  // 本项目除登录接口外，其它所有接口请求头信息中均需要包含token信息方可访问
  let authToken = localStorage.getItem('Auth-Token')
  headers['Auth-Token'] = authToken

  let options = { 
    headers: { 'Content-type': 'application/json', ...headers }, 
    method,
  }
  if (method === METHODS.POST || method === METHODS.PUT) { 
    if (options.headers['Content-type'] === 'application/json') { options.data = params }
  } else if (method === METHODS.GET || method === METHODS.DELETE) { 
    options.params = params
  }
  return Axios({ url, ...options })
}

export default {
  // 以下接口为示例：
  // post请求
  getDataList: params => request('api/data/list', params, METHODS.POST),
  // get请求
  getDataList1: params => request('api/data/list1', params),
  // put请求  // 有其他参数的亦可根据需要添加
  getDataList2: (id, params) => request('api/data/list2' + id, params, METHODS.PUT)
}