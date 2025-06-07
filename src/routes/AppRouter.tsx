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


export const AppRouter = () => {
    const { token } = useAuth();
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route index element={token ? <Home /> : <Navigate to="/login" />} /> */}
                    <Route index element={<Navigate to="Home" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/crear-producto" element={<CreateProduct />} />
                    <Route path="/stock" element={<ControlStock />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Cart" element={<Cart />} />
                    <Route path="modalCart" element={<ModalCart onClose={function (): void {
                        throw new Error("Function not implemented.");
                    } } />} />
                    <Route path="Catalogo" element={<Catalogo />} />
                    <Route path="/product/:nombre" element={<Product />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;