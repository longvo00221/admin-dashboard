import axios, { AxiosRequestHeaders } from 'axios'
import queryString from 'query-string'
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const publicClient = axios.create({
    baseURL,
    paramsSerializer:{
        encode:params => queryString.stringify(params)
    }
})
publicClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers:{
            "Content-Type": "application/json",

        }as AxiosRequestHeaders
    }
})
publicClient.interceptors.response.use((response) => {
    if (response && response.data) return response;
    return response;
  }, (err) => {
    throw err.response;
  });
  export default publicClient;