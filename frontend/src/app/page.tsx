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
import { blue } from '@mui/material/colors';

export default function Home() {
    const sx = {
        "& .MuiInputLabel-root": {
            color: "grey", // Text color for the label
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "grey", // Text color for the focused label
        },
        "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
            color: "grey", // Text color for options in the dropdown
        },
        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
            color: "grey", // Text color for selected options
        },
        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true'] .Mui-focused": {
            color: "grey", // Text color for focused selected options
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "blue",
        },
        "& .MuiAutocomplete-popper": {
            backgroundColor: "white", // Background color for the dropdown
            borderRadius: "12px", // Border radius for the dropdown
        },
        "& .MuiOutlinedInput-root": {
            backgroundColor: "white", // Background color for the input field
            borderRadius: "12px", // Border radius for the input field
            color: "grey", // Text color for the input field
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-input": {
            color: "grey", // Text color for the input text
        },
    };
    
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
                <form onSubmit={handleSubmit} method="get" className={`container-fluid ${styles.content}`}>
                    <div className={`row ${styles.contentRow}`}>
                        <div className={`col-4`}>
                            <Autocomplete
                                onChange={handleTripTypeChange}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={tripTypeOptions}
                                value={selectedTripTypeOption}
                                sx={sx}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className={`col-4 ${styles.Location}`}>
                            <Autocomplete
                                onChange={handleDepartureLocation}
                                disablePortal
                                className={`${styles.customAutocomplete} ${styles.contentInputs}`}
                                options={airportData}
                                value={departureLocation}
                                sx={sx}
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
                                sx={sx}
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
                                sx={sx}
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
                                sx={sx}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </div>
                    <div className={`row ${styles.contentRow}`}>
                        <div className={`col-2 ${styles.formButton}`}>
                            <button className={`${styles.submitButton}`} type="submit">
                                Search
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 19"
                                    className="w-8 h-8"
                                >
                                    <path
                                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
