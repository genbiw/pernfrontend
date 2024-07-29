import axios from "axios" 

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHostInfobip = axios.create({
    baseURL: process.env.REACT_APP_API_URL_INFOBIP
})

const authInterceptors = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

const authInterceptorsInfobip = config => {
    config.headers.authorization = `App 31e689c0156290cb6eed8ab0ae78b350-46420a4b-c683-411d-bb50-f9f3865c4db3`
    return config
}



$authHost.interceptors.request.use(authInterceptors)
$authHostInfobip.interceptors.request.use(authInterceptorsInfobip)

export {
    $host,
    $authHost,
    $authHostInfobip
} 