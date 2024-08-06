import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import airportNames from './airport_code.json';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    const [airportData, setAirportData] = useState([]);
    const [departureLocation, setDepartureLocation] = useState(null);
    const [arrivalLocation, setArrivalLocation] = useState(null);

    const today = new Date().toISOString().split('T')[0];;
    const [selectedDepatureDate, setSelectedDepatureDate] = useState(today);
    const [selectedReturnDate, setSelectedReturnDate] = useState(today);

    const tripTypeOptions = ['Round Trip', 'One-way'];
    const [selectedTripTypeOption, setSelectedTripTypeOption] = useState(tripTypeOptions[0]);

    const classes = ["Economy", "Premium", "Business", "First"];
    const [selectedClassOption, setSelectedClassOption] = useState(classes[0]);

    const adultsNumber = ["1 Adult", "2 Adult", "3 Adult", "4 Adult"];
    const [selectedAdultsNumber, setSelectedAdultsNumber] = useState(adultsNumber[0]);

    useEffect(() => {
        const transformedData = Object.keys(airportNames).map(name => {
            const { airportCode } = airportNames[name];
            return `${name} - ${airportCode}`;
        });

        setAirportData(transformedData);
    }, []);

    const handleSubmit = (e) => {
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

        navigate('/Search', { state });
    };

    const handleAdultNumberChange = (e) => {
        setSelectedAdultsNumber(e.target.value);
    };

    const handleTripTypeChange = (e) => {
        setSelectedTripTypeOption(e.target.value);
    };  

    const handleClassChange = (e) => {
        setSelectedClassOption(e.target.value);
    };

    const handleDepartureLocation = (event, newValue) => {
        setDepartureLocation(newValue);
    };

    const handleArrivalLocation = (event, newValue) => {
        setArrivalLocation(newValue);
    };

    const handleDepatureDate = (e) => {
        setSelectedDepatureDate(e.target.value);
    };

    const handleReturnDate = (e) => {
        setSelectedReturnDate(e.target.value);
    };

    return (
        <>
            <div>
                <div>
                    <img src="../public/background.jpg" id="home-content-img"/>
                </div>
                <form onSubmit={handleSubmit} method="get" className="container-fluid" id="home-content">
                    <div className="row home-content-row">
                        <div className="col-4">
                            <Autocomplete
                                onChange={handleTripTypeChange}
                                disablePortal
                                className="custom-autocomplete home-content-inputs"
                                options={tripTypeOptions}
                                value={selectedTripTypeOption}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="col-4">
                            <Autocomplete
                                onChange={handleDepartureLocation}
                                disablePortal
                                className="custom-autocomplete home-content-inputs"
                                options={airportData}
                                value={departureLocation}
                                renderInput={(params) => <TextField {...params} label="Departure" />}
                            />
                        </div>
                        <div className="col-3">
                          <Autocomplete
                                onChange={handleArrivalLocation}
                                disablePortal
                                className="custom-autocomplete home-content-inputs"
                                options={airportData}
                                value={arrivalLocation}
                                renderInput={(params) => <TextField {...params} label="Arrival" />}
                            />
                        </div>
                    </div>
                    <div className="row home-content-row">
                        <div className="col-4">
                            <div className="row home-content-dates">
                                <div className="col">
                                    <input 
                                        id="date-input-departure" 
                                        type="date" 
                                        value={selectedDepatureDate} 
                                        onChange={handleDepatureDate} 
                                        min={today}
                                        required
                                    />
                                </div>
                                <div className="col separator">
                                    <span id="separator-text">to</span> 
                                </div>
                                <div className="col">
                                    <input
                                        id="date-input-return"
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
                                className="custom-autocomplete home-content-inputs"
                                options={adultsNumber}
                                value={selectedAdultsNumber}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="col-3">
                            <Autocomplete
                                onChange={handleClassChange}
                                disablePortal
                                className="custom-autocomplete home-content-inputs"
                                options={classes}
                                value={selectedClassOption}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </div>
                    <div className="row home-content-row">
                        <div className="col home-submit-button">
                            <button type="submit">Search for fligths</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Home;