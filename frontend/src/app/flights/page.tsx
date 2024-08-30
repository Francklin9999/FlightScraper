"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const initialStateRef = useRef<any>(null);
    

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
        const handleResponse = (key: any, response: any) => {
            console.log(response);
            setData(prevData =>
                [...prevData, response]);
            setLoading(false);
        };

        // cheapflightsFetch(state).then(
        //     (response) => handleResponse('cheapflights', response)
        // ).catch(error => {
        //     console.error('Error fetching cheap flights:', error);
        // });
    
        flighthubFetch(state).then(
            (response) => handleResponse('flighthub', response)
        ).catch(error => {
            console.error('Error fetching flight hub:', error);
        });
    
        // skyscannerFetch(state).then(
        //     (response) => {handleResponse('skyscanner', response)
        //     console.log(data)}
        // ).catch(error => {
        //     console.error('Error fetching Skyscanner:', error);
        // });
    
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
            <div className={`conatiner`}>
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
                <div className={`row`}>
                <div className="col">
                    {data.length == 0 ? (
                        <p>Nothing found</p>
                    ) : (
                        data.map((item: [], index: number) => {
                            if (item === null) return;
                            return item.map((entry: skyscannerFetchData | flighthubFetchData | cheapflightsFetchData) => {
                                switch (entry.Site) {
                                    case "SkyScanner":
                                        if(isSkyscannerFetchData(entry)) {
                                            return <SkyscannerComponent key={index} {...entry} />;
                                        }
                                        break;
                                    case "Flighthub":
                                        if(isFlighthubFetchData(entry)) {
                                            return <FlighthubComponent key={index} {...entry} />;
                                        }
                                    case "Cheapflights":
                                        if(isCheapflightsFetchData(entry)) {
                                            return <CheapflightComponent key={index} {...entry} />;
                                        }
                                    case "Expedia":
                                        return <ExpediaComponent key={index} {...entry} />;
                                    default:
                                        return <p>{entry.Site}</p>;
                                }
                            });
                    }))}
                </div>
                </div>
            </div>
        </>
      );
};