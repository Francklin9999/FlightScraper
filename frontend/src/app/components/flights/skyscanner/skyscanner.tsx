"use client"

import { skyscannerFetchData } from "@/types";
import styles from './SkyscannerComponent.module.css';

interface SkyscannerComponentProps {
    Site: string;
    Airline: string;
    DepartureInfo: {
        Duration: string;
        Stop: string;
    };
    ReturnInfo: {
        Duration: string;
        Stop: string;
    };
    Price: number;
    Url: string;
    AdultNumber: number;
    ClassFlight: string;
}

export default function SkyscannerComponent({
    Site,
    Airline,
    DepartureInfo,
    ReturnInfo,
    Price,
    Url,
    AdultNumber,
    ClassFlight,
}: SkyscannerComponentProps) {

    return (
        <div className={styles.skyscannerComponent}>
            <h2>{Airline}</h2>
            <div>
                <h3>Departure Info</h3>
                <p>Duration: {DepartureInfo.Duration}</p>
                <p>Stop: {DepartureInfo.Stop}</p>
            </div>
            <div>
                <h3>Return Info</h3>
                <p>Duration: {ReturnInfo.Duration}</p>
                <p>Stop: {ReturnInfo.Stop}</p>
            </div>
            <div>
                <p>Price: ${Price}</p>
                <p>Adult Number: {AdultNumber}</p>
                <p>Class: {ClassFlight}</p>
                <a href={Url} target="_blank" rel="noopener noreferrer">More details</a>
            </div>
        </div>
    );
}
