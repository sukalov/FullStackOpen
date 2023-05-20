import { getWeather } from "./apiRequests";

const manageWeather = async (weather, country, setWeather) => {
    try {
  const now = Math.floor(Date.now() / 1000);
  const interval = 1800;
  let newWeather = { ...weather };
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
    });
  };
} catch (err) {
    console.error(err)}
}

export default manageWeather;
