import { Thermostat, Air } from "@mui/icons-material"
import { Grid, Typography, Skeleton, Alert } from "@mui/material"
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
    
    useEffect(() => {
      if (header) {
        manageWeather(weather, country, setWeather)
          .catch((e) => console.log(e));
      } // eslint-disable-next-line
    }, [search]);

    return (
        <>
            <Grid item xs={12}>
              <Cell>
                <Typography
                  variant="caption"
                  className="caption"
                  sx={{ marginBlock: "0 -10px" }}
                >
                  <Thermostat
                    sx={{ fontSize: "1.1rem", margin: "0 5px -3px 0" }}
                  />
                  weather in {country.capital[0]}:
                </Typography>
                {weather[country.name.common] !== undefined ?
                weather[country.name.common].error ? 
                <Alert severity="error" sx={{width: '70%', minWidth: '220px', margin: '5px auto 0 auto'}}>{weather[country.name.common].error}</Alert> :
                <Grid container sx={{maxWidth:'400px', margin:'auto'}}>
                    <Grid item xs={5} sx={{ display:'flex', alignItems:'center', justifyContent:'space-around', padding:'3px'}}>
                        <img
                        className='weather-icon'
                        alt={weather[country.name.common].data.current.condition.text}
                        title={weather[country.name.common].data.current.condition.text}
                        src={require(`../weather_icons/${weather[country.name.common].data.current.is_day}/${weather[country.name.common].data.current.condition.code}.svg`)}
                        />
                    </Grid>
                    <Grid item xs={3} sx={{ display:'flex', alignItems:'center', justifyContent:'space-around', padding:'3px'}}>
                        <Typography fontWeight={100} display='inline' fontSize='3.5rem' margin={0}>
                            {weather[country.name.common].data.current.temp_c}°
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center', padding:'3px'}}>
                        <Air className="air-icon" />
                        <Typography fontSize='1.2rem' margin={0}>
                                {weather[country.name.common].data.current.wind_kph} km/h
                        </Typography>
                    </Grid>
                </Grid> 
                :
                <Typography align="center">
                    <Skeleton height={60} sx={{width: '80%', margin: 'auto', marginTop: '-15px'}}></Skeleton>
                </Typography>
                }
              </Cell>
            </Grid> 
          </>
    )
}

export default Weather