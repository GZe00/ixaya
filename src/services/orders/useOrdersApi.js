import React from "react";
import ordersApi from "./index"
import { apiKey } from "../../config"


const useOrdersApi = () => {
    const [ordersapi, setOrdersapi] = React.useState([])
    const [error] = React.useState("")
    const [loadingOrders, setLoadingOrders] = React.useState(false)


    const getOrders = key => {
        setLoadingOrders(true)
        ordersApi(key).get().then(response => {
            if (response.status === 200)
                setOrdersapi(response.data.response)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoadingOrders(false)
        })
    }

    const createOrder = form => {
        return new Promise((resolve, reject) => {
            setLoadingOrders(true)
            ordersApi(apiKey).create(form).then(response => {
                resolve(response.status === 200 && response.data.status === 1)
            }).catch(() => {
                reject(false)
            }).finally(() => {
                setLoadingOrders(false)
            })
        })

    }

    React.useEffect(() => {
        if (apiKey) {
            if (ordersapi.length <= 0)
                getOrders(apiKey)
        }
    }, [])

    return {
        ordersapi,
        error,
        loadingOrders,
        createOrder
    }


}

export default useOrdersApi;