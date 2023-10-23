import axios from "axios"


const url = "https://urlshortener-backend-qyy5.onrender.com"


export const singUpApi = async (payload) => {
    const response = await axios.post(`${url}/user/signup`, payload)
    return response
}

export const loginApi = async (payload) => {
    const response = await axios.post(`${url}/user/login`, payload)
    return response
}

export const emailVerifyApi = async (payload) => {
    const response = await axios.post(`${url}/user/mailverify`, payload)
    return response
}

export const forgotPasswordApi = async (payload) => {
    const response = await axios.post(`${url}/user/forgotpassword`, payload)
    return response
}

export const passwordresetVerifyApi = async (rtoken, email, payload) => {
    const response = await axios.post(`${url}/user/passwordreset/${rtoken}/${email}`, payload)
    return response
}

export const longURLApi = async (payload, config) => {
    const response = await axios.post(`${url}/url/add`, payload, config)
    return response
}

export const findPerDayCountApi = async (config) => {
    const response = await axios.get(`${url}/url/today/count`, config)
    return response
}

export const findAllDataApi = async (config) => {
    const response = await axios.get(`${url}/url/get/alldata`, config)
    return response
}