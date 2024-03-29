import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CountryInfo from "./CountryInfo";
import manageWeather from "../services/manageWeather";

const CountriesList = ({
  countries,
  search,
  expandedItems,
  weather,
  setWeather
}) => {
  const openCountry = (country) => {
    manageWeather(weather, country, setWeather);
  };
  return countries.length > 10 && search !== "" ? (
    <Typography align="center">
      {countries.length} is too many matches...
    </Typography>
  ) : countries.length !== 0 && search !== "" ? (
    <div>
      {countries.map((country, i) => {
        return (
          <Accordion
            square
            sx={{
              marginTop: "5px",
              border: "1px solid transparent",
            }}
            key={country.name.common}
            expanded={expandedItems}
            onChange={() => openCountry(country)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`panel${i + 1}-header`}
            >
              <Typography
                key={country.name.common}
                fontWeight={300}
                variant="h2"
                fontSize="1.2rem"
              >
                {country.name.common}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ marginTop: "-15px" }}>
              <CountryInfo
                search={search}
                country={country}
                header={false}
                weather={weather}
                setWeather={setWeather}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  ) : search === "" ? null : (
    <Typography align="center">Nothing found!</Typography>
  );
};

export default CountriesList;
