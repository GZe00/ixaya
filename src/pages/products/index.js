import React from 'react'
import { List, Row, Col, Divider, Typography, Button, InputNumber, Tooltip, Rate, Pagination } from 'antd'
import { priceLabel } from '../../helpers'
import { ShoppingCartOutlined } from '@ant-design/icons'
import ItemDrawer from '../../components/drawers/Items'


const { Title, Text } = Typography

const Products = ({ onProductsAddedChange, productsApi, loading, search }) => {

    const [products, setProducts] = React.useState([])
    const [showDrawer, setShowDrawer] = React.useState(false)
    const [productSelected, setProductSelected] = React.useState()

    React.useEffect(() => {
        if (productsApi && productsApi.length > 0 && products.length <= 0)
            setProducts(productsApi)
    }, [productsApi])

    React.useEffect(() => {
        if (productsApi && productsApi.length > 0)
            if (search && search !== "") {
                setProducts(productsApi.filter(product => (product.title).toLowerCase().includes(search.toLowerCase())))
            } else {
                setProducts(productsApi)
            }

    }, [search])

    const handleQuantityChange = (quantity, id, action) => setProducts(products.map(item => {
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

    const handleAddedProductChange = productId => {
        products.forEach(item => {
            if (item.id === productId)
                onProductsAddedChange(item)

        })
    }

    const handleShowDrawer = (item) => {
        setProductSelected(item)
        setShowDrawer(true)
    }

    const handleCloseDrawer = () => setShowDrawer(false)

    return <div className="w-full h-full md:w-11/12 mx-auto my-8">
        <List
            dataSource={products}
            loading={loading}
            renderItem={product => {
                return <div className="px-8" >
                    <Row gutter={[10, 16]} justify="center">
                        <Col md={6} className="cursor-pointer" onClick={() => handleShowDrawer(product)}>
                            <img className="w-48" src={product.image_url} alt={`Imagen del producto ${product.title}`} />
                        </Col>
                        <Col md={14} className="cursor-pointer" onClick={() => handleShowDrawer(product)}>
                            <Title level={3} className="text-center md:text-left" style={{ margin: 0 }}>{product.title}</Title>
                            <Text type="secondary">Categoria: {product.category}</Text>
                            <div className="flex items-center mb-3 flex-col md:flex-row mt-4">
                                <Text strong>{Number(product.sale_count) % 2 === 0 ? 4.5 : 5}</Text>
                                <Rate style={{ margin: "-6px 4px 0 4px", }} allowHalf disabled defaultValue={product.reviews % 2 === 0 ? 4.5 : 5} />
                                <Text strong underline>{`${product.sale_count ? product.sale_count : "0 "} reseñas`}</Text>
                            </div>
                            <Text>{product.short_description}</Text>
                        </Col>
                        <Col md={4} align="center">
                            <div className="flex flex-col">
                                {
                                    product.discount ?
                                        <div className="flex flex-col">
                                            <Text type="secondary" italic delete>{priceLabel(Number(product.price))}</Text>
                                            <Title style={{ marginTop: 0 }} level={4}>{priceLabel(Number(product.price) - Number(product.discount))}</Title>
                                        </div>
                                        : <Title level={5}>{product.price}</Title>
                                }
                                <div className="flex items-center flex-col lg:flex-row z-0">
                                    <div className='flex'>
                                        <Button onClick={() => {
                                            if (product.quantity >= 0)
                                                handleQuantityChange(Number(product.quantity), product.id, "less")
                                        }}>
                                            -
                                        </Button>

                                        <InputNumber defaultValue={1} controls={false} value={product.quantity} onChange={(value) => handleQuantityChange(Number(value), product.id)} type="number" min={1} />

                                        <Button onClick={() => {
                                            if (product.quantity >= 0)
                                                handleQuantityChange(Number(product.quantity), product.id, "add")
                                        }}>
                                            +
                                        </Button>
                                    </div>
                                    <Tooltip placement="top" title="Agregar al carrito">
                                        <ShoppingCartOutlined className="text-3xl mt-2 lg:-mt-3 hover:cursor-pointer hover:text-ixaya-primary-500 ease-in duration-300"
                                            onClick={() => handleAddedProductChange(product.id)}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                </div>
            }}
        />

        <ItemDrawer item={productSelected} visible={showDrawer} onClose={handleCloseDrawer} />
        <Row justify="center">
            <Col>
                {
                    products && products.length > 0 ? <Pagination
                        showSizeChanger
                        defaultCurrent={1}
                        total={30}
                        disabled /> : <></>
                }
            </Col>
        </Row>
    </div>

}

export default Products