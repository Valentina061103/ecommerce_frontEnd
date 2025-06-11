import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.container_footer}>
        <div className={styles.footer_content}>
            <div className={styles.footer_column}>
            <h3>SOBRE NOSOTROS</h3>
            <p>
                Nike fue fundada en 1964 como Blue Ribbon Sports y se convirtió en Nike, Inc. en 1971. 
                Desde entonces ha liderado la innovación en calzado, ropa y accesorios deportivos en todo el mundo.
            </p>
            </div>
            <div className={styles.footer_column}>
            <h3>SUMATE A LA COMUNIDAD</h3>
            <ul>
                <li>Instagram: @nike</li>
                <li>Facebook: Nike</li>
                <li>Twitter: @Nike</li>
                <li>YouTube: Nike Official</li>
            </ul>
            </div>
            <div className={styles.footer_column}>
            <h3>DONDE ENCONTRARNOS</h3>
            <ul>
                <li>Nike Store Palermo - CABA</li>
                <li>Nike Store Córdoba</li>
                <li>Nike Store Mendoza</li>
                <li>Nike Store Rosario</li>
            </ul>
            </div>
        </div>
        </footer>
    );
    };
