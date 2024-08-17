import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";

export default function Footer() {
    return (
        <footer className={`${styles.footerFooter}`}>
            <p>Copyright © 2024</p>
            <p>Franck Fongang</p>
            <p>All rights Reserved</p>
        </footer>
    );
};