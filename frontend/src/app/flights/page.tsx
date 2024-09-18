"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import cheapflightsFetch from '@/app/components/flights/cheapflights/datafetch';
import CheapflightComponent from '@/app/components/flights/cheapflights/cheapflights';
import flighthubFetch from '@/app/components/flights/flighthub/datafetch';
import FlighthubComponent from '@/app/components/flights/flighthub/flighthub';
import skyscannerFetch from '@/app/components/flights/skyscanner/datafetch';
import SkyscannerComponent from '@/app/components/flights/skyscanner/skyscanner';
// import from '@/app/components/flights/expedia/datafetch';
import ExpediaComponent from '@/app/components/flights/expedia/expedia';
import { skyscannerFetchData, flighthubFetchData, cheapflightsFetchData } from '@/types';
import styles from './page.module.css';
import { isCheapflightsFetchData, isFlighthubFetchData, isSkyscannerFetchData } from '@/typeCheck';

export default function Flights() {
    const [state, setState] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const initialStateRef = useRef<any>(null);
    
    const [selectedAirline, setSelectedAirline] = useState<string | null>(null);
    const airlines = ['WestJet', 'Delta', 'Royal Air Maroc', 'Air Algerie', 'Rwandadir Express', 'Kenya Airways', 'United Airlines', 'Swiss International Air Lines', 'Brussels Airlines', 'Air Canada'];

    let numberOfError = 0;

    useEffect(() => {
        const storedState: any = sessionStorage.getItem('formState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            setState(parsedState);
            initialStateRef.current = parsedState;
        } else {
            setError(true);
        }
      }, []);
    
      const fetchData = useCallback(() => {
        const handleResponse = (response: any) => {
            const filteredResponse = response.filter((entry: any) => entry !== null);
            setData(prevData =>
                [...prevData, ...filteredResponse]);
            setLoading(false);
        };

        cheapflightsFetch(state).then(
            // (response) => handleResponse('cheapflights', response)
            (response) => handleResponse(response)
        ).catch(error => {
            numberOfError++;
            if(numberOfError === 3) {
                setError(true);
                setLoading(false);
                }
            console.error('Error fetching cheapflights:', error);
        });
    
        flighthubFetch(state).then(
            // (response) => handleResponse('flighthub', response)
            (response) => handleResponse(response)
        ).catch(error => {
            numberOfError++;
            if(numberOfError === 3) {
                setError(true);
                setLoading(false);
                }
            console.error('Error fetching flighthub:', error);
        });
    
        skyscannerFetch(state).then(
            // (response) => {handleResponse('skyscanner', response)
            (response) => handleResponse(response)
        ).catch(error => {
            numberOfError++;
            if(numberOfError === 3) {
                setError(true);
                setLoading(false);
                }
            console.error('Error fetching Skyscanner:', error);
        });
    
    }, [state]);

    useEffect(() => {
        const loadData = async () => {
            if (!state || Object.keys(state).length === 0) {
                return;
            }
            try {
                fetchData();
                console.log(data)
            } catch(error) {
                setError(true);
            }
        };

        loadData();
    }, [fetchData, state]);

    const handleFilterData = (key: string, ...text : any) => {
        if (key === 'bestPrice') {
            const sortedData = [...data].sort((a, b) => {
                const priceA = parseFloat(a.Price.replace(/[^0-9.-]/g, ''));
                const priceB = parseFloat(b.Price.replace(/[^0-9.-]/g, ''));
    
                return priceA - priceB;
            });
            setFilteredData(sortedData);
            console.log('bestPrice clicked');
        }
    
        if (key === 'fatest') {
            const convertDurationToMinutes = (duration: string) => {
                const hoursMatch = duration.match(/(\d+)h/);
                const minutesMatch = duration.match(/(\d+)m/);
    
                const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
                const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    
                return hours * 60 + minutes;
            };
    
            const sortedData = [...data].sort((a, b) => {
                const durationA = convertDurationToMinutes(a.DepartureInfo.Duration) + convertDurationToMinutes(a.ReturnInfo.Duration);
                const durationB = convertDurationToMinutes(b.DepartureInfo.Duration) + convertDurationToMinutes(b.ReturnInfo.Duration);
    
                return durationA - durationB;
            });
            setFilteredData(sortedData);
            console.log('fatest clicked');
        }

        if (key === 'airline') {
            const filteredData = data.filter(item => {
                if ('Airline' in item) {
                    return item.Airline === selectedAirline;
                }
                if ('DepartureInfo' in item && 'Airline' in item.DepartureInfo) {
                    return item.DepartureInfo.Airline === selectedAirline || item.ReturnInfo.Airline === selectedAirline;
                }
                return false;
            });;
            setFilteredData(filteredData);
            console.log('airline clicked');
        }
    };
    


    if(loading) {
        return (
            <div className={`search-loading-screen`}>
                <p>Loading...</p>
                <div className={`🤚`}>
                    <div className={`👉`}></div>
                    <div className={`👉`}></div>
                    <div className={`👉`}></div>
                    <div className={`👉`}></div>
                    <div className={`🌴`}></div>		
                    <div className={`👍`}></div>
                </div>
            </div>
        );
    };

    if(error) {
        return (
            <div className={`container`}>
                Sorry an error as occur on our end. Please try agin later!
            </div>
        );
    };

    return (
        <>
            <div className={`container ${styles.searchInfo}`}>
                <div className={`row`}>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>Departure:</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>{state["origin"]}</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>{state["departure"]}</p>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>Arrival:</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>{state["destination"]}</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>{state["return"]}</p>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>Information:</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>Number of Adult: {state["adult"] || 1}</p>
                    </div>
                    <div className={`col ${styles.searchInfoCols}`}>
                        <p>Class: {state["class"]}</p>
                    </div>
                </div>
            </div>
            <div className={`container-fluid ${styles.searchContent}`}>
                <div className={`container`}>
                    <div className={`row`}>
                        <button onClick={() => handleFilterData('bestPrice')}>
                            Best Price
                        </button>
                        <button onClick={() => handleFilterData('fatest')}>
                            Fastest
                        </button>
                        <div>
                            <button onClick={() => handleFilterData('airline', selectedAirline)}>
                                Select an Airline
                            </button>
                            <Autocomplete
                                disablePortal
                                options={airlines}
                                value={selectedAirline}
                                onChange={(event, newValue) => setSelectedAirline(newValue)}
                                renderInput={(params) => <TextField {...params} label="Airline" />}
                            />
                        </div>
                    </div>
                </div>
                <div className={`container`}>
                    <div className={`row`}>
                        <div className="col">
                            {data.length === 0 ? (
                                <p>Nothing found</p>
                            ) : (
                                (() => {
                                    const loopData = filteredData.length === 0 ? data : filteredData;
                                    const limitedData = loopData.slice(0, 15);
                                    
                                    return limitedData.map((entry, index) => {
                                        switch (entry.Site) {
                                            case "SkyScanner":
                                                return isSkyscannerFetchData(entry) ? (
                                                    <SkyscannerComponent key={index} {...entry} />
                                                ) : null;
                                            case "Flighthub":
                                                return isFlighthubFetchData(entry) ? (
                                                    <FlighthubComponent key={index} {...entry} />
                                                ) : null;
                                            case "Cheapflights":
                                                return isCheapflightsFetchData(entry) ? (
                                                    <CheapflightComponent key={index} {...entry} />
                                                ) : null;
                                            case "Expedia":
                                                return <ExpediaComponent key={index} {...entry} />;
                                            default:
                                                return <p key={index}>{entry.Site}</p>;
                                        }
                                    });
                                })()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
};