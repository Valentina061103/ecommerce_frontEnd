import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { Cart } from "../pages/Cart/Cart";
import Catalogo from "../pages/Catalog/Catalogo";
import Layout from "../components/Layout/Layout";
import { RegisterPage } from "../pages/Register/Register";
import CreateProduct from "../pages/Admin/CreateProduct/CreateProduct";
import { Product } from "../pages/Product/Product";
import { ModalCart } from "../components/modals/ModalCart/ModalCart";
import { LoginPage } from "../pages/Login/Login";
import { useAuth } from "../store/authContext";
import { ControlStock } from "../pages/Admin/ControlStock/ControlStock";
import { ProfilePage } from "../components/ProfilePage/ProfilePage"; 
import ScrollToTop from "../components/scrollTop/ScrollToTop";

export const AppRouter = () => {
    const { token } = useAuth(); // Usamos 'token' para proteger rutas

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="modalCart" element={<ModalCart onClose={() => { /* Manejar cierre del modal, si se renderiza aquí */ }} />} />
                    <Route path="catalogo" element={<Catalogo />} />
                    <Route path="product/:nombre" element={<Product />} />
                    
                    <Route
                        path="perfil" 
                        element={token ? <ProfilePage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="crear-producto"
                        element={token ? <CreateProduct /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="stock"
                        element={token ? <ControlStock /> : <Navigate to="/login" />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;