import axios from 'axios'
import { Toast } from 'antd-mobile'

// https://blog.csdn.net/sjn0503/article/details/74729300 
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
    Toast.loading('加载中',0)
    return config
})
// "transform-decorators-legacy",
// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((config) => {
    Toast.hide()
    return config
})
