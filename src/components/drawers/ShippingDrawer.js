import React from 'react'
import { Row, Col, Drawer, Button, Typography, Steps, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { priceLabel } from "../../helpers"


const { Text, Title } = Typography
const { Step } = Steps

const ShippingDrawer = ({ item, visible, onClose }) => {

    const handleOnCloseDrawer = () => onClose()

    return <Drawer
        title={item ? <h4>No. Orden {item.order_code}</h4> : null}
        visible={visible}
        onClose={handleOnCloseDrawer}
        extra={
            <Row justify="end">
                <Col>
                    <Button onClick={handleOnCloseDrawer}>
                        Cerrar
                    </Button>
                </Col>
            </Row>
        }
    >
        {
            item ?
                <Row gutter={[10, 16]} justify="center">
                    <Col span={24} align="center">
                        <UserOutlined className="text-4xl" />
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Contacto</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{item.phone}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Dirección</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{item.street_name}</Title>
                                <Title style={{ margin: 0 }} level={5}>{item.address}</Title>
                                <Title style={{ margin: 0 }} level={5}>{`Código Postal: ${item.zip_code}`}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Ciudad</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{`${item.city} ${item.state}`}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Subtotal</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{priceLabel(Number(item.subtotal))}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Descuentos</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{priceLabel(Number(item.discount))}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col span={12}><Text>Total</Text></Col>
                            <Col span={12} align="end">
                                <Title style={{ margin: 0 }} level={5}>{priceLabel(Number(item.total))}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <Steps direction="vertical" current={1} >
                            <Step style={{ display: 'flex', alignItems: 'center' }} title="Pago completado" description="Se ha realizado con éxito la transacción." />
                            <Step style={{ display: 'flex', alignItems: 'center' }} title="Preparando su envío" description="El vendedor está preparando todo lo necesario para envíar su producto." />
                            <Step style={{ display: 'flex', alignItems: 'center' }} title="En tránsito" description="Su producto está en camino." />
                            <Step style={{ display: 'flex', alignItems: 'center' }} title="Ha llegado" description="Gracias su compra." />
                        </Steps>
                    </Col>

                </Row>
                : null
        }
    </Drawer>

}

export default ShippingDrawer