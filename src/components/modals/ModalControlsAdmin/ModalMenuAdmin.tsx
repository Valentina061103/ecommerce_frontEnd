import styles from "./ModalControlsAdmin.module.css";
import { useNavigate } from "react-router-dom";

interface ModalAdmin {
    onClose: () => void;
}

export const ModalControlsAdmin = ({ onClose }: ModalAdmin) => {
    const navigate = useNavigate();

    const goTo = (path: string) => {
        navigate(path);
        onClose(); // Cerrar modal después de redirigir
    };

    return (
        <div className={styles.modalAdmin}>
        <p onClick={() => goTo("/stock")}>Control stock</p>
        <p onClick={() => goTo("/crear-producto")}>Subir producto</p>
        </div>
    );
};
