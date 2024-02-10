import { $host, $authHost } from "./index";

export const getBasket = async(userId) => {
    const {data} = await $host.get("api/basket/" + userId)
    return data
}

export const addDevice = async(userId, deviceId) => {
    const body = {
        userId,
        deviceId
    }    
    const {data} = await $host.post("api/basket", body)
    return data
}

export const updateDevice = async(userId, deviceId, reqQuantity) => {
    const url = `api/basket/user/${userId}/device/${deviceId}/update?reqQuantity=${reqQuantity}`
    const {data} = await $host.delete(url)
    return data
}

export const deleteDevice = async(userId, deviceId) => {
    const url = `api/basket/user/${userId}/device/${deviceId}/delete`
    const {data} = await $host.delete(url)
    return data
}

export const deleteAllDevices = async(userId) => {
    const {data} = await $host.delete("api/basket/user/" + userId)
    return data
} 

export const createCheckOutSession = async(userId) => {
    const {data} = await $host.post("api/stripe/create-checkout-session/" + userId)
    return data
}