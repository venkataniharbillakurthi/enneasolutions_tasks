import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { BackgroundLayout, MiniCard, WeatherCard } from "./Components";
import Nav from "./Components/Nav";
import { useStateContext } from "./Context";
import Entry from "./Enter";

function WeatherApp() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  return (
    <div className="w-full h-screen text-white px-8">
      <Nav input={input} setInput={setInput} setPlace={setPlace} />
      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather?.wspd}
          humidity={weather?.humidity}
          temperature={weather?.temp}
          heatIndex={weather?.heatindex}
          iconString={weather?.conditions}
          conditions={weather?.conditions}
          setPlace={setPlace}
        />
        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).length > 0 ? (
            values
              .slice(1, 7)
              .map((curr) => (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              ))
          ) : (
            <p>No data available for MiniCards</p>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;
