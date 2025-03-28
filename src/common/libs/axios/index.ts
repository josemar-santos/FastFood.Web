import axios from "axios"
import { baseUrl } from "../../utils"

const request = axios.create({
    baseURL: baseUrl
})

export { request }