import CountriesList from "./CountriesList";
import CountryInfo from "./CountryInfo";

const CounriesBlock = ({
  search,
  countries,
  weather,
  setWeather,
  kkey,
  setKey,
}) => {
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().search(search.toLowerCase().trim()) ===
      0
  );
  return (
    <div className="country-block">
      {filteredCountries.length > 1 || filteredCountries.length === 0 ? (
        <CountriesList
          search={search}
          countries={filteredCountries}
          weather={weather}
          setWeather={setWeather}
          kkey={kkey}
          setKey={setKey}
        />
      ) : (
        <CountryInfo
          country={filteredCountries[0]}
          weather={weather}
          setWeather={setWeather}
          kkey={kkey}
          setKey={setKey}
          search={search}
        />
      )}
    </div>
  );
};

export default CounriesBlock;
