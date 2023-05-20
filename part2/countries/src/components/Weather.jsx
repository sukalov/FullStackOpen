import { Thermostat } from "@mui/icons-material"
import { Grid, Typography, Skeleton } from "@mui/material"
import manageWeather from "../services/manageWeather";
import { useEffect } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Cell = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fefeef",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: "100px",
  minHeight: "100%",
}));


const Weather = ({ weather, setWeather, country, header, search}) => {

    console.log(search, 'TOP');
    useEffect(() => {
        console.log(search)
      if (header) {
        manageWeather(weather, country, setWeather)
          .catch((e) => console.log(e));
      } // eslint-disable-next-line
    }, [search]);

    return (
        <>
        {weather[country.name.common] !== undefined ?
            <Grid item xs={12}>
              <Cell>
                <Typography
                  variant="caption"
                  className="caption"
                  sx={{ marginBlock: "0 -10px" }}
                >
                  <Thermostat
                    sx={{ fontSize: "1.1rem", margin: "0 5px -3px 0" }}
                  >
                    Building
                  </Thermostat>
                  weather in {country.capital[0]}:
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <img className='weather-icon' alt={weather[country.name.common].data.current.condition.text} title={weather[country.name.common].data.current.condition.text} src={weather[country.name.common].data.current.condition.icon} ></img>
                        <Typography display='inline' fontSize='1.2rem'>
                            {weather[country.name.common].data.current.temp_c} °C
                        </Typography>
                    </Grid>
                </Grid>
              </Cell>
            </Grid> : 
            (
              <Grid item xs={12}>
              <Cell>
                <Typography
                  variant="caption"
                  className="caption"
                  xs={{ marginBlock: "-5px" }}
                >
                  <Thermostat
                    sx={{ fontSize: "1.1rem", margin: "0 5px -3px 0" }}
                  >
                    Building
                  </Thermostat>
                  weather in {country.capital[0]}:
                </Typography>
                <Typography align="center">
                  <Skeleton height={60} sx={{width: '80%', margin: 'auto', marginTop: '-15px'}}></Skeleton>
                </Typography>
              </Cell>
            </Grid>
            )
          }
          </>
    )
}

export default Weather