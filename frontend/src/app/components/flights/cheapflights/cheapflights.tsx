import { cheapflightsFetchData } from "@/types";

export default function cheapflightComponent(props: cheapflightsFetchData) {
    return (
        <div className="container">
            <div className="row">
                <p>{ props.Airline }</p>
            </div>
            <div className="row">
                <p>{ props.Departure.Duration }</p>
                <p>{ props.Departure.Stop }</p>
            </div>
            <div className="row">
                <p>{ props.Return.Duration }</p>
                <p>{ props.Return.Stop }</p>
            </div>
            <div className="row">
                <p>{ props.Price }</p>
            </div>
        </div>
    );
}