"use client"

import { skyscannerFetchData } from "@/types";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SkyscannerComponent.module.css';

// interface SkyscannerComponentProps {
//     Site: string;
//     Airline: string;
//     DepartureInfo: {
//         Duration: string;
//         Stop: string;
//     };
//     ReturnInfo: {
//         Duration: string;
//         Stop: string;
//     };
//     Price: number;
//     Url: string;
//     AdultNumber: number;
//     ClassFlight: string;
// }

export default function SkyscannerComponent({
    Site,
    Airline,
    DepartureInfo,
    ReturnInfo,
    Price,
    Url,
    AdultNumber,
    ClassFlight,
}: skyscannerFetchData) {

    return (
        <div className={`container ${styles.skyscannerComponent}`}>
            <h2 className={`row ${styles.title}`}>{Site}</h2>
            <h2 className={`row ${styles.airline}`}>{Airline}</h2>
            <div className={`row ${styles.rowContent}`}>
                <div className={`col`}>
                    <h3>Departure Info</h3>
                    <p>Duration: {DepartureInfo.Duration}</p>
                    <p>Stop: {DepartureInfo.Stop}</p>
                </div>
                <div className={`col`}>
                    <h3>Return Info</h3>
                    <p>Duration: {ReturnInfo.Duration}</p>
                    <p>Stop: {ReturnInfo.Stop}</p>
                </div>
            </div>
            <div className={`row`}>
                <p className={`col`}>Price: {Price}</p>
                <p className={`col`}>Adult Number: {AdultNumber}</p>
                <p className={`col`}>Class: {ClassFlight}</p>
            </div>
            <div className={`row`}>
                <a href={Url} target="_blank" rel="noopener noreferrer">More details</a>
            </div>
        </div>
    );
}
