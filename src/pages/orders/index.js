import React from 'react'
import { Col, List, Pagination, Row, Space, Tooltip, Typography } from 'antd'
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import ShippingDrawer from '../../components/drawers/ShippingDrawer'

const { Title } = Typography

const Orders = ({ ordersApi, loading }) => {

    const [itemSelected, setItemSelected] = React.useState()
    const [showDrawerItem, setShowDrawerItem] = React.useState(false)

    const handleCloseDrawerItem = () => {
        setShowDrawerItem(false)
        setItemSelected()
    }

    const handleShowDrawer = (item) => {
        setItemSelected(item)
        setShowDrawerItem(true)
    }

    return <div className="w-full md:w-10/12 lg:w-8/12 px-8 py-2 md:px-0 mx-auto ease-in duration-500">
        <div className="block md:hidden my-2">
            <Row gutter={[8, 16]} align="middle" justify='center'>
                <Col>
                    <ShoppingOutlined className="text-xl" />
                </Col>
                <Col>
                    <Title style={{ margin: 0 }} level={2}>Mis compras</Title>
                </Col>
            </Row>
        </div>
        <div className="hidden md:block my-4">
            <Row gutter={[8, 16]} align="middle" justify='start'>
                <Col>
                    <ShoppingOutlined className="text-3xl" />
                </Col>
                <Col>
                    <Title style={{ margin: 0 }} level={2}>Mis compras</Title>
                </Col>
            </Row>
        </div>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <List
                loading={loading}
                dataSource={ordersApi}
                renderItem={order => {
                    return <List.Item className='hover:cursor-pointer' onClick={() => handleShowDrawer(order)}>
                        <Tooltip title="Ver más detalles" placement="top">
                            <List.Item.Meta
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                avatar={<UserOutlined className="text-2xl" />}
                                title={`Enviando a ${order.street_name} ${order.address} - ${order.city} ${order.state} ${order.zip_code}`}
                                description={`${order.phone} `}
                            />
                        </Tooltip>
                    </List.Item>

                }}
            />
        </Space>

        <ShippingDrawer item={itemSelected} visible={showDrawerItem} onClose={handleCloseDrawerItem} />
        <Row justify="center">
            <Col>
                {
                    ordersApi && ordersApi.length > 0 ? <Pagination
                        showSizeChanger
                        defaultCurrent={1}
                        total={30}
                        disabled /> : <></>
                }
            </Col>
        </Row>
    </div >
}

export default Orders