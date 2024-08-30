import { cheapflightsFetchData } from "@/types";

export default async function cheapflightsFetch(params: any) {
    const url = 'http://localhost:8080/api/cheapflights';
    try {
        const queryParams = new URLSearchParams(params as any).toString();
        const response = await fetch(`${url}${queryParams}`);
        const data: cheapflightsFetchData = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}