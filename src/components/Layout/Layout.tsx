import { Outlet } from 'react-router-dom';
import {Header} from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useState } from 'react';
import { ModalCart } from '../modals/ModalCart/ModalCart';

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
        <Footer/>
        {isCartOpen && <ModalCart onClose={closeCart} />}
        </>
    );
    };

export default Layout;
