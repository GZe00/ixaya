import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/products'
import Order from "./pages/orders"
import Layout from './components/layout'
import CarShopProducts from "./pages/products/car";
import useOrdersApi from "./services/orders/useOrdersApi";
import useProductsApi from "./services/products/useProductsApi";
import uniqid from 'uniqid'
import { message } from "antd";


const App = () => {
  const { ordersapi, loadingOrders } = useOrdersApi()
  const { productsapi, loadingProducts } = useProductsApi()

  const [products, setProducts] = React.useState([])
  const [orders, setOrders] = React.useState([])

  const [ordersLength, setOrdersLength] = React.useState([])

  const [address, setAddress] = React.useState([])

  const [searchProduct, setSearchProduct] = React.useState()

  React.useEffect(() => {
    setOrdersLength(ordersapi.length)
    setOrders(ordersapi)
  }, [ordersapi])


  const handleUpdateOrders = item => setOrders([...orders, { ...item }])

  const handleProductsChange = values => {
    values.idmanual = uniqid()
    message.success("Se ha agregado un nuevo producto al carrito!")
    setProducts([...products, { ...values }])
  }

  const handleSuccessPurchase = action => {
    if (action === "reset")
      setProducts([])
  }
  const handleOrdersLengthUpdate = () => setOrdersLength(orders.length + 1)
  const handleQuantityUpdate = (quantity, id, action) => {
    setProducts(products.map(item => {
      if (item.id === id)
        if (action) {
          if (action === "add" && item.quantity + 1 >= 1)
            item.quantity = item.quantity + 1
          if (action === "less" && item.quantity - 1 >= 1)
            item.quantity = item.quantity - 1
        } else {
          item.quantity = quantity
        }
      return item
    }))
  }
  const handleDeleteProduct = idmanual => {
    message.error("Se ha quitado el producto del carrito de compras")
    setProducts(products.filter(product => product.idmanual !== idmanual))
  }
  const handleDirectionsChange = id => setAddress(address.filter(direction => direction.id !== id))
  const handleAddressChange = direction => setAddress([...address, { ...direction }])
  const handleAddressUpdate = values => setAddress(values)
  const handleDirectionSelect = id => setAddress(address.map(direction => {
    if (direction.id === id) {
      direction.default = true
    } else {
      direction.default = false
    }
    return direction
  }))
  const handleSearchChange = term => setSearchProduct(term)

  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<Layout productsLength={products.length} ordersLength={ordersLength} onSearchChange={handleSearchChange} />}>
        <Route index element={<Products onProductsAddedChange={handleProductsChange} loading={loadingProducts} productsApi={productsapi} search={searchProduct} />} />
        <Route path="orders" element={<Order ordersApi={orders} loading={loadingOrders} />} />
        <Route path="products/shop" element={<CarShopProducts products={products} address={address} onUpdateOrders={handleUpdateOrders}
          onDeleteProduct={handleDeleteProduct} onQuantityUpdate={handleQuantityUpdate} onUpdateLength={handleOrdersLengthUpdate} onSuccessPurchase={handleSuccessPurchase}
          onAddAddress={handleAddressChange} onDeleteDirection={handleDirectionsChange} onEditDirection={handleAddressUpdate} onSelectDirection={handleDirectionSelect} />} />
      </Route>
    </Routes>
  </BrowserRouter>

}

export default App