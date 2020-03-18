import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiKey = "db46bd6fe27f262730a9d28825696aff";
// const city = "Novi Sad";

const Home = () => {
  const history = useHistory();
  const [city, setCity] = useState();

  const getWeather = async () => {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=Novi Sad&appid=${apiKey}`
    );
    setCity(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <hr />
      {city && (
        <div>
          <h1>
            City: <strong>{city.name}</strong>
          </h1>
          <p>
            Description: <strong>{city.weather[0].description}</strong>
          </p>
          <p>
            Temperature: <strong>{city.main.temp}</strong>
          </p>
          <p>
            Min Temperature: <strong>{city.main.temp_min}</strong>
          </p>
          <p>
            Max temperature: <strong>{city.main.temp_max}</strong>
          </p>
        </div>
      )}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Home;
