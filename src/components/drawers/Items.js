import React from 'react'
import { Row, Col, Drawer, Button, Typography, Rate } from 'antd'


const { Text, Title } = Typography

const ItemDrawer = ({ item, visible, onClose }) => {

    const handleOnCloseDrawer = () => onClose()

    return <Drawer
        title={item ? <h4>{item.title}</h4> : null}
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
                        <img className="w-48" src={item.image_url} alt={`Imagen del producto ${item.title}`} />
                    </Col>
                    <Col span={24}>
                        <Title level={3} className="text-center md:text-left" style={{ margin: 0 }}>{item.title}</Title>
                        <Text type="secondary">Categoria: {item.category}</Text>
                        <div className="flex justify-center items-center mb-3 flex-col md:flex-row mt-4">
                            <Text strong>{Number(item.sale_count) % 2 === 0 ? 4.5 : 5}</Text>
                            <Rate style={{ margin: "-6px 4px 0 4px", }} allowHalf disabled defaultValue={item.reviews % 2 === 0 ? 4.5 : 5} />
                            <Text strong underline>{`${item.sale_count ? item.sale_count : "0"} reseñas`}</Text>
                        </div>
                        <Text>{item.short_description}</Text>
                    </Col>
                    <Col span={24}>
                        <Text>
                            {
                                item.description
                            }
                        </Text>
                    </Col>
                </Row>
                : null
        }
    </Drawer>

}

export default ItemDrawer