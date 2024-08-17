"use client"

import { useState, useEffect, useCallback } from 'react';
import cheapflightsFetch from '@/app/components/flights/cheapflights/datafetch';
import cheapflightComponent from '@/app/components/flights/cheapflights/cheapflights';
import flighthubFetch from '@/app/components/flights/flighthub/datafetch';
import flighthubComponent from '@/app/components/flights/flighthub/flighthub';
import skyscannerFetch from '@/app/components/flights/skyscanner/datafetch';
import skyscannerComponent from '@/app/components/flights/skyscanner/skyscanner;
// import from '@/app/components/flights/expedia/datafetch';
import styles from './page.module.css';

export default function Flights() {
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const storedState: any = sessionStorage.getItem('formState');
        if (storedState) {
            setState(JSON.parse(storedState));
        } else {
            setError(true);
        }
      }, []);
    
    const fetchData = useCallback(async () => {
        cheapflightsFetch(state).then(
                (response) => {
                    setData(response);
                    setLoading(false);
                }
        );
        flighthubFetch(state).then(
                (response) => {
                    setData(response);
                    setLoading(false);
                }
        );
        skyscannerFetch(state).then(
                (response) => {
                    setData(response);
                    setLoading(false);
                }
        );
        }, [state]);

    useEffect(() => {
        const loadData = async () => {
            if (!state || Object.keys(state).length === 0) {
                return;
            }
            await fetchData();
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
            <div>Error</div>
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
                    <div className={`col ${styles.searchInfoCol}`}>
                        <p>{state["return"]}</p>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col ${styles.searchInfoCol}`}>
                        <p>Information:</p>
                    </div>
                    <div className={`col ${styles.searchInfoCol}`}>
                        <p>Number of Adult: {state["adult"] || 1}</p>
                    </div>
                    <div className={`col ${styles.searchInfoCol}`}>
                        <p>Class: {state["class"]}</p>
                    </div>
                </div>
            </div>
            <div className={`container-fluid ${styles.searchContent}`}>
                <div className={`row`}>
                    <div className={`col`}>
                        {/* {data.map((item: any, index: any) => (
                            <div className={`container ${styles.searchResult}`} key={index}>
                                <div className={`row ${styles.searchSite}`}>
                                    <div className={`col`}>
                                        <p>Price: {item['price']}</p>
                                    </div>
                                    <div className={`col`}>
                                        <a href={item['url']} target="_blank" rel="noopener noreferrer">Website Link</a>
                                    </div>
                                </div>
                                <div className={`row ${styles.searchParams}`}>
                                <p>Adult: {item['adultNumber']}</p><p>Class: {item['class']}</p>
                                </div>
                                <div className={`row ${styles.searchLink}`}>
                                    <p className={`${styles.searchParamsText}`}>Site: {item['site']}</p>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </>
      );
};