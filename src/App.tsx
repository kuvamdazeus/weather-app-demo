import React, { useState } from "react";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("https://node-demo-k5ax.onrender.com/getWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities: cityInput.split(",") }),
      });

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error("Response not ok", response);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cityInput">
            Enter cities (comma-separated):
            <input
              type="text"
              id="cityInput"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
          </label>
          <button type="submit">Get Weather</button>
        </form>

        {weatherData.length > 0 && (
          <div>
            <h2>Weather Data:</h2>
            <ul>
              {weatherData.map((data) => {
                const [tempData] = Object.entries(data) as any;
                console.log(tempData);
                return <li>{`${tempData[0]}: ${tempData[1]}`}</li>;
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
