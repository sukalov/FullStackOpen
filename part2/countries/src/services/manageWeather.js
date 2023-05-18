import { getWeather } from "./apiRequests";

const manageWeather = async (weather, country) => {
  const now = Math.floor(Date.now() / 1000);
  const interval = 3600;
  let newWeather = { ...weather };
  if (
    weather[country.name.common] === undefined ||
    weather[country.name.common.timeStamp] + interval > now
  ) {
    const weatherData = getWeather(country);
    weatherData.then((res) => {
      const countryWeather = {
        timeStamp: now,
        data: res,
      };
      newWeather[country.name.common] = countryWeather;
      return newWeather;
    });
  };
  return newWeather
};

export default manageWeather;
