import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');

    const today = new Date().toISOString().split('T')[0];;
    const [selectedDepatureDate, setSelectedDepatureDate] = useState(today);
    const [selectedReturnDate, setSelectedReturnDate] = useState(today);

    const tripTypeOptions = ['Round Trip', 'One-way', 'Multi-city'];

    const [selectedTripTypeOption, setSelectedTripTypeOption] = useState(tripTypeOptions[0]);

    const handleTripTypeChange = (event) => {
        setSelectedTripTypeOption(event.target.value);
      };  

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        navigate('/Search');
    };

    const handleDepatureDate = (e) => {
        setSelectedDepatureDate(e.target.value);
    }

    const handleReturnDate = (e) => {
        setSelectedReturnDate(e.target.value);
    }

    return (
        <>
            <div>
                <div>
                    <img src="../public/background.jpg" id="home-content-img"/>
                </div>
                <form onSubmit={handleSubmit} method="get" className="container-fluid" id="home-content">
                    <div className="row home-content-row">
                        <div className="col-4">
                            <select className="home-content-inputs" value={selectedTripTypeOption} onChange={handleTripTypeChange}>
                                {tripTypeOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-4">
                            <input placeholder='Departing from' className="home-content-inputs" required></input>
                        </div>
                        <div className="col-3">
                            <input placeholder='Arriving at' className="home-content-inputs" required></input>
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
                            <input placeholder='1 adult' className="home-content-inputs" required></input>
                        </div>
                        <div className="col-3">
                            <input placeholder='Economy' className="home-content-inputs" required></input>
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