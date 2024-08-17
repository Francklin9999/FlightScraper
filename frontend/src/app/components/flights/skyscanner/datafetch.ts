import { skyscannerFetchData } from "@/types";

export default async function skyscannerFetch(params: any) {
    const url = 'https://localhost:3000/api/skyscanner';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}${queryParams}`);
        const data: skyscannerFetchData = await response.json();
        return data;
    } catch(error) {
        console.error(error);
        return null;
    }
}