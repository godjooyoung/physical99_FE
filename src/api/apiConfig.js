// axios 요청이 들어가는 모든 모듈
import axios from "axios"

// 데이터 CRUD 인스턴스
const instance = axios.create({
    baseURL : "http://localhost:4000/"
})

// 테스트를 위한 목 인스턴스
const testInstance = axios.create({
    baseURL : "https://0a98f1f5-0d64-4224-be67-8457351a3d32.mock.pstmn.io/"
})

/* 요청 */
instance.interceptors.request.use(
    function(config){
        return config
    },
    function(error){
        return Promise.reject(error)
    },
)

/* 응답 */
instance.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error)
    },
)

export default instance
export {testInstance}