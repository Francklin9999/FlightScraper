import { flighthubFetchData } from "@/types";


export default function FlighthubComponent(props: any) {
    return (
        <div className="container">
            <div className="row">
                <p>{ props.Airline[1] }</p>
                <p>{ props.Airline[2] }</p>
            </div>
            <div className="row">
                <p>{ props.Departure.Duration }</p>
            </div>
            <div className="row">
                <p>{ props.Return.Duration }</p>
            </div>
            <div className="row">
                <p>{ props.Price }</p>
            </div>
        </div>
    );
}