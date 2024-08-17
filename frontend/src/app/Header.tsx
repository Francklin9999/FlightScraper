import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";

export default function Header() {
    return (
        <>
            <div className={`container-fluid ${styles.headerContent}`}>
                <div className={`row ${styles.headerContent}`}>
                    <div className={`col ${styles.headerContentItems}`}>
                        <span className={`${styles.headerContentItemsTitle} ${styles.headerFranck}`}>Franck</span>
                        <span className={`${styles.headerContentItemsTitle} ${styles.headerFlights}`}>Flights</span>
                    </div>
                    <div className={`col ${styles.headerContentItems}`}>
                        <h3 className={`${styles.headerContentItemsPhrase}`}>Book a flight now!</h3>
                    </div>
                    <div className={`col ${styles.headerContentItems} ${styles.headerContentItemsCurrency}`}>
                        <img className={`${styles.headerCadFlag}`} src="/assets/canada_flag.png" />
                        <h4>$CAD</h4>
                    </div>
                </div>
            </div>
        </>
    );
};
