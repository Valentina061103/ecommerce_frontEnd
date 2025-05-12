import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { Cart } from "../pages/Cart/Cart";
import Catalogo from "../pages/Catalog/Catalogo";
import Layout from "../components/Layout/Layout";


export const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Catalogo" element={<Catalogo />} />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
