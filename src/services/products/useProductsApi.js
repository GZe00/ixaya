import React from "react";
import productsApi from "./index"
import { apiKey } from "../../config"


const useProductsApi = () => {
    const [productsapi, setProductsapi] = React.useState([])
    const [error] = React.useState("")
    const [loadingProducts, setLoadingProducts] = React.useState(false)

    const getProducts = key => {
        setLoadingProducts(true)
        productsApi(key).get().then(response => {
            if (response.status === 200)
                setProductsapi((response.data.response).map(product => {
                    product.quantity = 1
                    product.reviews = Math.floor(Math.random() * (5500 - 1000))
                    return product
                }))

        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoadingProducts(false)
        })
    }


    React.useEffect(() => {
        if (apiKey) {
            if (productsapi.length <= 0)
                getProducts(apiKey)
        }
    }, [])


    return {
        productsapi,
        error,
        loadingProducts,
    }


}

export default useProductsApi;