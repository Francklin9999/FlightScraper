import { cheapflightsFetchData } from "@/types";

export default function CheapflightComponent({
    Site,
    Airline,
    Departure,
    Return,
    Price,
    }: cheapflightsFetchData) {
    return (
        <div className="container">
            <h2>{Site}</h2>
            <div className="row">
                <p>{ Airline }</p>
            </div>
            <div className="row">
                <h3>Departure Info</h3>
                <p>{ Departure.Duration }</p>
                <p>{ Departure.Stop }</p>
            </div>
            <div className="row">
                <p>{ Return.Duration }</p>
                <p>{ Return.Stop }</p>
            </div>
            <div className="row">
                <p>{ Price }</p>
            </div>
        </div>
    );
}