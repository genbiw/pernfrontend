import { $host, $authHost } from "./index";
import {jwtDecode} from "jwt-decode"

export const registration = async(email, phoneNumber, password, userName,age, gender, city, address, country) => {
    const {data} = await $host.post("api/user/registration", {email, phoneNumber, password, role: "USER", userName, age, gender, city, address, country})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token) 
}

export const login = async(email, password) => {
    const {data} = await $host.post("api/user/login", {email, password})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const check = async() => {
    const {data} = await $authHost.get("api/user/auth")
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
} 

export const updateUserAttribute = async(email, attributename, attributevalue) => {
    const {data} = await $authHost.post("api/user/updateuser", {email, attributename, attributevalue})
    return data
} 