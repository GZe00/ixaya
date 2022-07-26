import axios from "axios"
import { apiUrl } from "../config"

const api = axios.create({
    baseURL: apiUrl,
})

export { api }
