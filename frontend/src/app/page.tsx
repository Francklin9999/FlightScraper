"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import airportNames from './public/assets/airport_code.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";
import { AirportData } from '@/types';

export default function Home() {
    const router = useRouter();

    const [airportData, setAirportData] = useState<string[]>([]);
    const [departureLocation, setDepartureLocation] = useState<string | null>(null);
    const [arrivalLocation, setArrivalLocation] = useState<string | null>(null);

    const today: string = new Date().toISOString().split('T')[0];;
    const [selectedDepatureDate, setSelectedDepatureDate] = useState<string>(today);
    const [selectedReturnDate, setSelectedReturnDate] = useState<string>(today);

    const tripTypeOptions: string[] = ['Round Trip', 'One-way'];
    const [selectedTripTypeOption, setSelectedTripTypeOption] = useState<string | null>(tripTypeOptions[0]);

    const classes = ["Economy", "Premium", "Business", "First"];
    const [selectedClassOption, setSelectedClassOption] = useState<string | null>(classes[0]);

    const adultsNumber = ["1 Adult", "2 Adult", "3 Adult", "4 Adult"];
    const [selectedAdultsNumber, setSelectedAdultsNumber] = useState<string | null>(adultsNumber[0]);

    useEffect(() => {
        const airports: AirportData = airportNames;      
        const transformedData: string[] = Object.keys(airports).map(name => {
            const { airportCode } = airports[name];
            return `${name} - ${airportCode}`;
        });

        setAirportData(transformedData);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');

        const state = {
            "origin": departureLocation,
            "destination": arrivalLocation,
            "departure": selectedDepatureDate,
            "return": selectedReturnDate,
            "adults": selectedAdultsNumber,
            "class": selectedClassOption, 
        };

        console.log(state);

        sessionStorage.setItem('formState', JSON.stringify(state));
        router.push('/flights');

    };

    const handleAdultNumberChange = (event: React.SyntheticEvent, newValue: string | null) => {
        setSelectedAdultsNumber(newValue);
    };

    const handleTripTypeChange = (event: React.SyntheticEvent, newValue: string | null) => {
        setSelectedTripTypeOption(newValue);
    };  

    const handleClassChange = (event: React.SyntheticEvent, newValue: string | null) => {
        setSelectedClassOption(newValue);
    };

    const handleDepartureLocation = (event: React.SyntheticEvent, newValue: string | null) => {
        setDepartureLocation(newValue);
    };

    const handleArrivalLocation = (event: React.SyntheticEvent, newValue: string | null) => {
        setArrivalLocation(newValue);
    };

    const handleDepatureDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDepatureDate(e.target.value);
    };

    const handleReturnDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReturnDate(e.target.value);
    };

    return (
        <>
            <div>
                <div>
                  {/* <Image
                    src="/assets/background.jpg"
                    alt="Background"
                    width={1200} 
                    height={800}
                    /> */}
                    <img src="/assets/background.jpg" className={`${styles.ContentImg}`}/>
                </div>

                <form onSubmit={handleSubmit} method="get" className={`container-fluid ${styles.content}`}>
                    <div className={`row ${styles.ContentRow}`}>
                        <div className={`col-4`}>
                            <Autocomplete
                                onChange={handleTripTypeChange}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={tripTypeOptions}
                                value={selectedTripTypeOption}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="col-4">
                            <Autocomplete
                                onChange={handleDepartureLocation}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={airportData}
                                value={departureLocation}
                                renderInput={(params) => <TextField {...params} label="Departure" />}
                            />
                        </div>
                        <div className="col-3">
                          <Autocomplete
                                onChange={handleArrivalLocation}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={airportData}
                                value={arrivalLocation}
                                renderInput={(params) => <TextField {...params} label="Arrival" />}
                            />
                        </div>
                    </div>
                    <div className={`row ${styles.contentRow}`}>
                        <div className="col-4">
                            <div className={`row ${styles.contentDates}`}>
                                <div className="col">
                                    <input 
                                        className={`${styles.dateInputDeparture}`} 
                                        type="date" 
                                        value={selectedDepatureDate} 
                                        onChange={handleDepatureDate} 
                                        min={today}
                                        required
                                    />
                                </div>
                                <div className="col separator">
                                    <span className={`${styles.separatorText}`}>to</span> 
                                </div>
                                <div className="col">
                                    <input
                                        className={`${styles.dateInputReturn}`}
                                        type="date"
                                        value={selectedReturnDate}
                                        onChange={handleReturnDate}
                                        min={selectedDepatureDate}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <Autocomplete
                                onChange={handleAdultNumberChange}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={adultsNumber}
                                value={selectedAdultsNumber}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="col-3">
                            <Autocomplete
                                onChange={handleClassChange}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={classes}
                                value={selectedClassOption}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </div>
                    <div className={`row ${styles.contentRow}`}>
                        <div className={`col ${styles.submitButton}`}>
                            <button type="submit">Search for fligths</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
