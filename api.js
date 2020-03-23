import request from './utils/request'
// 请求文章详情数据
export const fetchPostDetail = async function(data = {}) {
  return await request({
    method: 'get',
    url: '/blog/post/detail',
    data
  })
}
// 请求文章列表
export const fetchPostList = async function(data = {}) {
  return await request({
    method: 'get',
    url: '/blog/post/findList',
    data
  })
}
// 请求最新文章列表
export const fetchPostNewList = async function(data = {}) {
  return await request({
    method: 'get',
    url: '/blog/post/findNewList',
    data
  })
}
// 请求分类数据
export const fetchClassifyList = async function(data = {}) {
  return await request({
    method: 'get',
    url: '/blog/classify/find',
    data
  })
}
// 浏览统计vv
export const fetchStatisticsAdd = async function(data = {}) {
  return await request({
    method: 'post',
    url: '/blog/statistics/create',
    data
  })
}