import { flighthubFetchData } from "@/types";


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
        <div className="container">
            <h2>{Site}</h2>
            <div className="row">
                <h3>Departure Info</h3>
                <p>Duration: {DepartureInfo.Airline}</p>
                <p>Duration: {DepartureInfo.Duration}</p>
                <p>Stop: {DepartureInfo.CombinedTime}</p>
            </div>
            <div className="row">
                <h3>Return Info</h3>
                <p>Duration: {ReturnInfo.Airline}</p>
                <p>Duration: {ReturnInfo.Duration}</p>
                <p>Stop: {ReturnInfo.CombinedTime}</p>
            </div>
            <div className="row">
                <p>Price: ${Price}</p>
                <p>Adult Number: {AdultNumber}</p>
                <p>Class: {ClassFlight}</p>
                <a href={Url} target="_blank" rel="noopener noreferrer">More details</a>
            </div>
        </div>
    );
}

