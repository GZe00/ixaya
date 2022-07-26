import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

const Layout = ({ productsLength, ordersLength, onSearchChange }) => {

    return (
        <div className='w-full h-screen overflow-y-auto flex flex-col'>
            <div className="w-full sticky top-0 z-20 bg-slate-100 py-4 flex justify-around items-center border-b-2">
                <Navbar productsLength={productsLength} ordersLength={ordersLength} onSearchChange={onSearchChange} />
            </div>
            <div className="w-full">
                <Outlet />
            </div>
            <div className="w-full py-8"><p className="text-center">© 2022 DEMO Ixaya NET All Rights Reserved</p></div>
        </div>
    )
}

export default Layout