import { flighthubFetchData } from "@/types";

export default async function flighthubFetch(params: any) {
    const url = 'https://localhost:3000/api/flighthub';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}${queryParams}`);
        const data: flighthubFetchData = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}