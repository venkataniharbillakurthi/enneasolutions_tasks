import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context";
import { useDate } from "../Utils/useDate";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import sun from "../assets/icons/sun.png";
import wind from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  setPlace,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();
  const { isLoading, isError, error, thisLocation } = useStateContext();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  if (isError) {
    return (
      <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-red-600">
          Error: {error.message || "Failed to fetch weather data."}
        </p>
        <button
          onClick={() => setPlace("Rajahmundry")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Invalid Location!..
        </button>
      </div>
    );
  }

  if (isLoading && thisLocation === place) {
    return (
      <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard flex justify-center items-center">
        <p className="text-xl font-semibold">Loading weather for {place}...</p>
      </div>
    );
  }

  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt="weather_icon" />
        <p className="font-bold text-5xl">{temperature} &deg;C</p>
      </div>
      <div className="font-bold text-center text-xl">{place}</div>
      <div className="w-full flex justify-between items-center mt-4">
        <p className="flex-1 text-center p-2">{new Date().toDateString()}</p>
        <p className="flex-1 text-center p-2">{time}</p>
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
          Wind Speed <p className="font-normal">{windspeed} km/h</p>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
          Humidity <p className="font-normal">{humidity} gm/m&#179;</p>
        </p>
      </div>
      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">Heat Index</p>
        <p className="text-lg">{heatIndex ? heatIndex : "N/A"}</p>
      </div>
      <hr className="bg-slate-600" />
      <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
