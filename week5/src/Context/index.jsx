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
        queryFn: async () => {
            try {
                return await fetchWeather(place);
            } catch (err) {
                throw new Error(err.message); 
            }
        },
        enabled: !!place,
    });

    

    if (isError) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div>
                    <p>Error: {error.message}</p>
                    <button
                        onClick={() => setPlace('Rajahmundry')} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Invalid Location!..
                    </button>
                </div>
            </div>
        );
    }

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
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

