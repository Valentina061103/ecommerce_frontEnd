import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { Cart } from "../pages/Cart/Cart";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    );
};

