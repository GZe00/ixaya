import React from 'react'
import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Input, Tooltip, Badge } from 'antd'
import { Link } from "react-router-dom";
import IxayaNetLogo from '../../images/ixayanetlogo.png'

const Navbar = ({ productsLength, ordersLength, onSearchChange }) => {

    const [term, setTerm] = React.useState()

    React.useEffect(() => {
        onSearchChange(term)
    }, [term])

    return <>
        <div className="w-36 hover:scale-105 ease-in duration-200"><a href='https://www.ixaya.com/' rel="noreferrer" target='_blank'><img src={IxayaNetLogo} alt="Logo IxayaNet" className="w-36" /></a></div>
        <div className="hidden md:w-96 md:block"><Input.Search allowClear={true} placeholder='Buscar producto...' value={term} onChange={({ target }) => setTerm(target.value)} /></div>
        <div className="flex">
            <Link to="/" className='pr-2 md:pr-3 cursor-pointer'>
                <div className="flex flex-col items-center justify-center hover:scale-125 ease-in duration-200 hover:text-blue-400">
                    <div className="block md:hidden">
                        <Tooltip title="Inicio">
                            <HomeOutlined className="text-3xl" />
                        </Tooltip>
                    </div>
                    <HomeOutlined className="hidden md:block text-3xl" />
                    <p className="hidden md:block" style={{ fontSize: "12px" }}>Inicio</p>
                </div>
            </Link>

            <Link to="/orders" className='pl-3 md:pl-4 cursor-pointer'>
                <Badge count={ordersLength}>
                    <div className="flex flex-col items-center justify-center hover:scale-125 ease-in duration-200 hover:text-blue-400">
                        <div className="block md:hidden">
                            <Tooltip title="Ver mis compras">
                                <ShoppingOutlined className="text-3xl" />
                            </Tooltip>
                        </div>
                        <ShoppingOutlined className="hidden md:block text-3xl" />
                        <p className="hidden md:block mt-1" style={{ fontSize: "12px" }}>Mis compras</p>
                    </div>
                </Badge>
            </Link>
            <Link to="/products/shop" className='pl-3 md:pl-4 cursor-pointer'>
                <Badge count={productsLength}>
                    <div className="flex flex-col items-center justify-center cursor-pointer hover:scale-125 ease-in duration-200">
                        <div className="block md:hidden">
                            <Tooltip title="Ver mi carrito">
                                <ShoppingCartOutlined className="text-3xl" />
                            </Tooltip>
                        </div>
                        <ShoppingCartOutlined className="hidden md:block text-3xl" />
                        <p className="hidden md:block mt-1" style={{ fontSize: "12px" }}>Ver mi carrito</p>
                    </div>
                </Badge>
            </Link>
        </div>
    </>
}

export default Navbar