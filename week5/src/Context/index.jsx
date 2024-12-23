import { useContext, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = async (place) => {
    const options = {
        method: 'GET',
        url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
        params: {
            aggregateHours: '24',
            location: place,
            contentType: 'json',
            unitGroup: 'metric',
            shortColumnNames: 0,
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    const response = await fetch(options.url + "?" + new URLSearchParams(options.params), {
        method: options.method,
        headers: options.headers
    });

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const thisData = Object.values(data.locations)[0];
    return thisData;
};

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [place, setPlace] = useState('Rajahmundry');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['forecast', place],
        queryFn: () => fetchWeather(place),
        enabled: !!place,
    });

    return (
        <StateContext.Provider
            value={{
                weather: data?.values[0],
                setPlace,
                values: data?.values,
                thisLocation: data?.address,
                isLoading,
                place,
                isError,
                error,
                setPlace,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
