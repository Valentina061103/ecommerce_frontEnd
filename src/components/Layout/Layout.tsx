import { Outlet } from 'react-router-dom';
import {Header} from '../Header/Header';
import { useState } from 'react';
import { ModalCart } from '../ModalCart/ModalCart';

const Layout = () => {
    //lo guardamos como un estado local
    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <>
        <Header CartClick={openCart}/>
        <main>
            <Outlet />
        </main>
        {isCartOpen && <ModalCart onClose={closeCart} />}
        </>
    );
    };

export default Layout;
