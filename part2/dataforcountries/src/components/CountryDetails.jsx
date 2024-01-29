// CountryDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const api_key = import.meta.env.VITE_WEATHER_API_KEY; // Make sure to set this environment variable

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
        );

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (api_key) {
      fetchWeather();
    } else {
      console.error(
        "OpenWeatherMap API key is missing. Please set the VITE_OPENWEATHERMAP_API_KEY environment variable."
      );
    }
  }, [api_key, country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        style={{ width: "100px" }}
      />

      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : (
        <p>Failed to fetch weather data</p>
      )}
    </div>
  );
};

export default CountryDetails;
