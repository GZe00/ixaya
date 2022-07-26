import React from 'react'
import { List, Row, Col, Space, InputNumber, Button, Divider, Tooltip, Typography, Input, Form, Drawer, message } from 'antd'
import { priceLabel } from '../../helpers'
import { DeleteOutlined, EditOutlined, LockOutlined } from '@ant-design/icons'
import uniqid from 'uniqid'
import useOrdersApi from '../../services/orders/useOrdersApi'
import { useNavigate } from 'react-router-dom';
import ItemDrawer from '../../components/drawers/Items'


const { Text, Title } = Typography

const CarShopProducts = ({ products, address,
    onDeleteDirection, onAddAddress, onEditDirection, onUpdateOrders,
    onSelectDirection, onDeleteProduct, onQuantityUpdate, onUpdateLength, onSuccessPurchase }) => {
    const navigate = useNavigate();


    const [form] = Form.useForm()
    const { createOrder, loading } = useOrdersApi()

    const [showDrawer, setShowDrawer] = React.useState(false)
    const [mode, setMode] = React.useState("new")
    const [directionProperties, setDirectionProperties] = React.useState()
    const [showDrawerItem, setShowDrawerItem] = React.useState(false)
    const [productSelected, setProductSelected] = React.useState()

    const handleOnCloseDrawer = () => {
        setMode("new")
        setShowDrawer(false)
        form.resetFields()
    }

    const handleCloseDrawerItem = () => {
        setShowDrawerItem(false)
        setProductSelected()
    }

    const handleQuantityChange = (quantity, id, action) => onQuantityUpdate(quantity, id, action)

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (mode === "new") {
                values.id = uniqid()
                onAddAddress(values)
            }
            if (mode === "edit") {
                let directions = JSON.parse(JSON.stringify(address))
                onEditDirection(directions.map(direction => {
                    if (direction.id === directionProperties.id)
                        direction = { ...values, id: directionProperties.id, default: directionProperties.default }

                    return direction
                }))
                setDirectionProperties()
                setMode("new")
            }
            form.resetFields()

        }).catch(() => { })
    }

    const editDirection = direction => {
        setMode("edit")
        setDirectionProperties({
            id: direction.id,
            default: direction.default
        })
        form.setFieldsValue({
            street_name: direction.street_name,
            zip_code: direction.zip_code,
            address: direction.address,
            phone: direction.phone,
            city: direction.city,
            state: direction.state,
        })
    }

    const handleCreateOrder = async () => {
        let direction = address.find(addres => addres.default)
        let products_list = JSON.parse(JSON.stringify(products))
        let form = {
            street_name: direction.street_name,
            zip_code: direction.zip_code,
            address: direction.address,
            phone: direction.phone,
            state: direction.state,
            city: direction.city,
            subtotal: products_list.reduce((total, product) => total + Number(product.price) * Number(product.quantity), 0),
            discount: products_list.reduce((total, product) => total + Number(product.discount) * Number(product.quantity), 0),
            total: products_list.reduce((total, product) => total + (Number(product.price) - Number(product.discount)) * Number(product.quantity), 0),
            product_list: products_list.map(product => {
                return {
                    product_id: Number(product.id),
                    qty: product.quantity
                }
            })
        }
        let result = await createOrder(form)
        if (result) {
            message.success("Gracias por su compra, se ha realizado el pago con éxito", 5)
            onSuccessPurchase("reset")
            onUpdateOrders(form)
            onUpdateLength()
            navigate('/orders', { replace: true })
        } else {
            message.error("Ha ocurrido un error al momento de realizar el pago, si el problema persiste comuniquese con atención a clientes.", 4)
        }
    }

    const handleShowDrawer = (item) => {
        setProductSelected(item)
        setShowDrawerItem(true)
    }

    return <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-10">
        <Row gutter={[8, 16]}>
            <Col span={24} align="end">
                <Button onClick={() => setShowDrawer(true)}>
                    Agregar dirección de envío
                </Button>
            </Col>
            <Col span={24}>
                <Space direction='vertical' size={16} style={{ width: '100%' }} >
                    <List
                        dataSource={products}
                        renderItem={product => {
                            return <>
                                <div className="px-4 flex items-center md:block ">
                                    <div className="block md:hidden sm:px-2 md:px-4">
                                        <Tooltip placement='topLeft' title="Eliminar de mi lista">
                                            <DeleteOutlined className=" text-lg hover:scale-125 ease-in duration-200 hover:text-red-500 hover:cursor-pointer" onClick={() => onDeleteProduct(product.idmanual)} />
                                        </Tooltip>
                                    </div>

                                    <Row gutter={[12, 16]} align="middle" wrap={true} justify={"center"}>
                                        <Col md={2} className="hidden md:block">
                                            <Tooltip placement='topLeft' title="Eliminar de mi lista">
                                                <DeleteOutlined className="text-xl hover:scale-125 ease-in duration-200 hover:text-red-500 hover:cursor-pointer" onClick={() => onDeleteProduct(product.idmanual)} />
                                            </Tooltip>
                                        </Col>
                                        <Col md={6} className="cursor-pointer" onClick={() => handleShowDrawer(product)}>
                                            <img className="w-48" src={product.image_url} alt={`Imagen del producto ${product.title}`} />
                                        </Col>
                                        <Col md={12} className="cursor-pointer" onClick={() => handleShowDrawer(product)}>
                                            <Title className='text-center' level={5}>{product.title}</Title>
                                            <p className="text-center text-xs text-gray-400">Haga click aqui para ver mas detalles</p>
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
                                                <div className="flex items-center">
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
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <Divider />
                            </>
                        }}
                    />
                </Space>
                <div>
                    <Row justify="space-between">
                        <Col>
                            <Text strong>Descuentos</Text>
                        </Col>
                        <Col>
                            <Text >{priceLabel(products.reduce((total, product) => total + Number(product.discount) * Number(product.quantity), 0))}</Text>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col>
                            <Text strong>Subtotal</Text>
                        </Col>
                        <Col>
                            <Text>{priceLabel(products.reduce((total, product) => total + Number(product.price) * Number(product.quantity), 0))}</Text>
                        </Col>
                    </Row>
                    <Divider dashed={true} className="border-2" />
                    <Row justify="space-between">
                        <Col>
                            <Text strong>Total</Text>
                        </Col>
                        <Col>
                            <Title level={3}>{priceLabel(products.reduce((total, product) => total + (Number(product.price) - Number(product.discount)) * Number(product.quantity), 0))}</Title>
                        </Col>
                    </Row>
                </div>
                <Row justify="center">
                    {
                        address.length > 0 && address.some(direction => direction.default) && products.length > 0 ?
                            <Col>
                                <Button style={{ display: 'flex', alignItems: 'center' }} icon={<LockOutlined />} className="bg-ixaya-primary-500" type="primary"
                                    onClick={handleCreateOrder} loading={loading}
                                >Realizar compra</Button>
                            </Col> :
                            <Tooltip title={`${products.length <= 0 ? "Agrega un producto" : address.length > 0 ? address.some(direction => direction.default) ? "" : "Selecciona una sucursal " : "Agrega una dirección"} antes de realizar la compra`}>
                                <Col>
                                    <Button disabled style={{ display: 'flex', alignItems: 'center' }} icon={<LockOutlined />} className="bg-ixaya-primary-500" type="primary">Realizar compra</Button>
                                </Col>
                            </Tooltip>
                    }
                </Row>
            </Col>
        </Row >
        <Drawer
            title={`Dirección de envío`}
            visible={showDrawer}
            onClose={handleOnCloseDrawer}
            extra={
                <Row>
                    <Col>
                        <Button onClick={() => handleOnCloseDrawer()}>
                            Cerrar
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Space direction="vertical" size={14} style={{ width: '100%' }}>
                <Row>
                    <Col span={24}>
                        <Form
                            form={form}
                            layout='horizontal'
                            requiredMark
                        >
                            <Space direction='vertical' size={10} style={{ width: '100%' }}>
                                <Row gutter={[8, 16]}>
                                    <Col span={14}>
                                        <Form.Item name="street_name"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa nombre de la calle'
                                            }]}>
                                            <Input placeholder="Calle" type="text" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item name="zip_code"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa tu código postal'
                                            }]}>
                                            <Input placeholder="Código Postal" type="number" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[8, 16]}>
                                    <Col span={10}>
                                        <Form.Item name="address"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa tu Colonia'
                                            }]}>
                                            <Input placeholder="Colonia" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={14}>
                                        <Form.Item name="phone"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa tu número de telefono'
                                            }]}>
                                            <Input placeholder="Número de teléfono" min={0} maxLength={13} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[8, 16]}>
                                    <Col span={12}>
                                        <Form.Item name="city"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa tu Ciudad'
                                            }]}>
                                            <Input placeholder="Ciudad" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="state"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Ingresa tu Estado'
                                            }]}>
                                            <Input placeholder="Estado" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button onClick={onFinish}>
                                    {
                                        mode === "new" ? "Agregar nuevo" : "Guardar"
                                    }
                                </Button>
                            </Space>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Title level={5}>O selecciona una dirección ya registrada</Title>
                    </Col>
                    <Col span={24}>
                        <List
                            dataSource={address}
                            renderItem={direction => {
                                return <List.Item style={{ zIndex: 0 }} className={`hover:cursor-pointer px-3 ${direction.default ? "bg-slate-200" : "hover:bg-slate-100"} rounded`}  >
                                    <List.Item.Meta title={`${direction.street_name} ${direction.address} ${direction.zip_code}`} onClick={() => {
                                        onSelectDirection(direction.id)
                                        handleOnCloseDrawer()
                                    }} description={`${direction.phone} - ${direction.city} ${direction.state}`} />
                                    <Row gutter={[8, 16]} style={{ zIndex: 20 }}>
                                        <Col>
                                            <Tooltip title="Editar dirección">
                                                <EditOutlined onClick={() => editDirection(direction)} />
                                            </Tooltip>
                                        </Col>
                                        <Col>
                                            <Tooltip title="Eliminar dirección">
                                                <DeleteOutlined onClick={() => onDeleteDirection(direction.id)} />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </List.Item>
                            }}
                        />
                    </Col>
                </Row>
            </Space>

        </Drawer >

        <ItemDrawer item={productSelected} visible={showDrawerItem} onClose={handleCloseDrawerItem} />
    </div >

}

export default CarShopProducts