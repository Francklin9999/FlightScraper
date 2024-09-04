"use client"

import { cheapflightsFetchData } from "@/types";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CheapflightsComponent.module.css';

export default function CheapflightComponent({
    Site,
    Airline,
    DepartureInfo,
    ReturnInfo,
    Price,
    Url,
    AdultNumber,
    ClassFlight,
    }: cheapflightsFetchData) {
    return (
        <div className={`container ${styles.cheapflightsComponent}`}>
            <h2 className={`row ${styles.title}`}>{Site}</h2>
            <h2 className={`row ${styles.airline}`}> Airline: { Airline } </h2>
            <div className={`row ${styles.rowContent}`}>
                <div className={`col`}>
                    <h3>Departure Info</h3>
                    <p>Duration: { DepartureInfo.Duration }</p>
                    <p>Stop: { DepartureInfo.Stop }</p>
                    <p>Time: { DepartureInfo.CombinedTime }</p>
                </div>
                <div className={`col`}>
                    <p>Duration: { ReturnInfo.Duration }</p>
                    <p>Stop: { ReturnInfo.Stop }</p>
                    <p>Time: { ReturnInfo.CombinedTime }</p>
                </div>
            </div>
            <div className={`row`}>
                <p className={`col`}>Price: { Price }</p>
                <p className={`col`}>Adult Number: {AdultNumber}</p>
                <p className={`col`}>Class: {ClassFlight}</p>
            </div>
            <div className={`row`}>
                <a href={Url} target="_blank" rel="noopener noreferrer">More details</a>
            </div>
        </div>
    );
}