import {request} from './request'

// 使用封装好的axios发送网络请求
export function getHomeMultidata(){
  // 返回值是Promise类型
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

