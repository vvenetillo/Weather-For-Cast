// npm Start
import React, { useState } from "react";
//  Framer Motion
import { motion } from "framer-motion"
// Style
import "./WeatherApp.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=db8f580a6f4a489daf7121938231006&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  };

  

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do tempo
        </a>
      </nav>

      <main className="container">
        <div className="weather-app">
          <div className="content">
            <h1>Verifique a previsão do tempo em sua cidade</h1>
            <p className="lead">Digite o nome da sua cidade no campo abaixo</p>
            <input
              type="text"
              className="city-input"
              value={city}
              onChange={handleChange}
              placeholder="Digite a cidade"
            />
            <motion.button 
            className="search-button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            animate={{ x: 40 }}
            
             onClick={handleSearch}>
              Pesquisar
            </motion.button>

            {weatherForecast && (
              <div className="weather-info">
                <img src={weatherForecast.current.condition.icon} alt="Weather Icon" />
                <h3 className="textres">Atualmente em {city} o dia está: {weatherForecast.current.condition.text}</h3>
                <p className="loading">Temp: {weatherForecast.current.temp_c}º</p>
                <p className="leadUmi">Umidade: {weatherForecast.current.humidity}</p>
                <p className="leadPais">País: {weatherForecast.location.country}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
