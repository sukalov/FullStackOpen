import axios from "axios";
const url = "https://restcountries.com/v3.1/";
const weatherUrl = "https://api.weatherapi.com/v1/current.json";

const getAll = () => {
  const result = axios.get(`${url}all`);
  return result.then((res) => res.data);
};

const getWeather = (country) => {
  return axios
  .get(`${weatherUrl}?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}&aqi=no`)
  .then((res) => res.data)
};

export { getAll, getWeather };
