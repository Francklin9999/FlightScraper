"use client"

import { flighthubFetchData } from "@/types";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FlighthubComponent.module.css';


export default function FlighthubComponent({
    Site,
    DepartureInfo,
    ReturnInfo,
    Price,
    Url,
    AdultNumber,
    ClassFlight,
    }: flighthubFetchData)
    {
    return (
        <div className={`container ${styles.flighthubComponent}`}>
            <h2 className={`row ${styles.title}`}>{Site}</h2>
            <div className={`row ${styles.rowContent}`}>
                <div className={`col`}>
                    <h3>Departure Info</h3>
                    <h2 className={`row ${styles.airline}`}> Airline: { DepartureInfo.Airline } </h2>
                    <p>Duration: {DepartureInfo.Duration}</p>
                    <p>Stop: {DepartureInfo.CombinedTime}</p>
                </div>
                <div className={`col`}>
                    <h3>Return Info</h3>
                    <h2 className={`row ${styles.airline}`}> Airline: { DepartureInfo.Airline } </h2>
                    <p>Duration: {ReturnInfo.Duration}</p>
                    <p>Stop: {ReturnInfo.CombinedTime}</p>
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

