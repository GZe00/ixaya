import { api } from "../api"

const orders = key => {
    api.interceptors.request.use(config => {
        config.headers = {
            "Content-Type": "application/json",
            "x-api-key": `${key}`,
        }
        return config
    })
    const get = () => {
        return api.get(`/api/orders`)
    }

    const getOne = id => {
        return api.post(`/api/orders/detail`, {
            "order_id": id
        })
    }

    const create = form => {
        return api.post(`/api/orders/create`, form)
    }

    return {
        get,
        getOne,
        create
    }
}

export default orders
