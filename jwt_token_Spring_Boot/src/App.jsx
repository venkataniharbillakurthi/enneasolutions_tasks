import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { BackgroundLayout, MiniCard, WeatherCard } from "./Components";
import Nav from "./Components/Nav";
import { useStateContext } from "./Context";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Entry from "./Enter";
import authService from "./services/authService";
import Dashboard from "./Components/Dashboard/Dashboard";

const ProtectedRoute = ({ children }) => {
  const token = authService.getCurrentUser();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
        <Route 
          path="/login" 
          element={
            authService.getCurrentUser() 
              ? <Navigate to="/entry" replace /> 
              : <Login />
          } 
        />
        <Route 
          path="/register" 
          element={
            authService.getCurrentUser() 
              ? <Navigate to="/entry" replace /> 
              : <Register />
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entry"
          element={
            <ProtectedRoute>
              <Entry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <WeatherApp />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/" 
          element={
            authService.getCurrentUser() 
              ? <Navigate to="/entry" replace /> 
              : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
