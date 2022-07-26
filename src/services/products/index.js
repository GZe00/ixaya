import { api } from "../api"

const products = key => {
    api.interceptors.request.use(config => {
        config.headers = {
            "Content-Type": "application/json",
            "x-api-key": `${key}`,
        }
        return config
    })
    const get = () => {
        return api.get(`/api/products`)
    }

    return {
        get
    }
}

export default products
