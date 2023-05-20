import { getWeather } from "./apiRequests";

const manageWeather = async (weather, country, setWeather) => {
    let newWeather = { ...weather };
    try {
  const now = Math.floor(Date.now() / 1000);
  const interval = 1800;
  if (
    weather[country.name.common] === undefined ||
    weather[country.name.common].timeStamp + interval < now
  ) {
    const weatherData = getWeather(country);
    weatherData.then((res) => {
      const countryWeather = {
        timeStamp: now,
        data: res,
      };
      newWeather[country.name.common] = countryWeather;
      setWeather(newWeather);
    //   console.log(res)
    }).catch(err => {
        console.log(err)
        newWeather[country.name.common] = {error: 'cannot provide weather data for this country'};
        setWeather(newWeather)
    })
  };
} catch (err) {
    newWeather[country.name.common] = {error: 'cannot provide weather data for this country'};
    setWeather(newWeather);}
}

export default manageWeather;
