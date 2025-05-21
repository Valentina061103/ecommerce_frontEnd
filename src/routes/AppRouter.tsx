import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { Cart } from "../pages/Cart/Cart";
import Catalogo from "../pages/Catalog/Catalogo";
import Layout from "../components/Layout/Layout";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register"; 
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import { Product } from "../pages/Product/Product";


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="Home" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/crear-producto" element={<CreateProduct />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Cart" element={<Cart />} />
                    <Route path="Catalogo" element={<Catalogo />} />
                    <Route path="/producto/:id" element={<Product />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;