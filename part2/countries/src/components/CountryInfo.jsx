import { Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import {AccountBalance, MapOutlined, Language, Flag} from "@mui/icons-material"
import Paper from '@mui/material/Paper';
import { GridRowSpacingParams } from '@mui/x-data-grid';

const Cell = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fefeef',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '100px',
    minHeight: '100%'
  }));


const CountryInfo = ({country, header=true}) => {
    if (country !== undefined) {
        // console.log(country);
        return (
            <div className="country-info">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {header ? <Typography variant="h3" sx={{marginBlock: '10px 30px'}}> {country.name.common}</Typography> : null}      
                    </Grid>
                    <Grid item xs={12.5} sm={3} container spacing={1} sx={{marginLeft: '-8px', padding: 0, minHeight: '100%'}}>
                        <Grid item xs={6} sm={12} >
                            <Cell>
                            <Typography variant="caption" className="caption" ><>
                                <AccountBalance sx={{fontSize:'1rem', margin:'0 5px -2px 0'}}></AccountBalance>
                                capital{typeof country.capital !== 'object' || (country.capital.length > 2 ? `s` : null)}: 
                            </></Typography>
                                    {typeof country.capital !== 'object' ? <span key={country.name.common}>—</span> :
                                        <span>{
                                            country.capital.map(city =>
                                                 <Typography key={city}>
                                                    {city}
                                                </Typography>
                                            )         
                                        }
                                        </span>
                                    }
                            </Cell>
                        </Grid>
                    <Grid item xs={6} sm={12}>
                        <Cell>
                            <Typography variant="caption" className="caption" >
                            <MapOutlined sx={{fontSize:'1rem', margin:'0 5px -2px 0'}}>Building</MapOutlined>
                                area: </Typography>
                            <Typography>{String(country.area)} km<sup style={{ fontSize: '0.7em', verticalAlign: 'super' }}>2</sup></Typography>
                        </Cell>
                    </Grid>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Cell>
                            <Typography variant="caption" className="caption" xs={{marginBlock: '-5px'}}>
                                <Language sx={{fontSize:'1rem', margin:'0 5px -2px 0'}}>Building</Language>
                                language{country.languages == undefined || (Object.keys(country.languages).length > 1 ? `s` : null)}: 
                            </Typography>
                            {country.languages ? 
                                <ul className="langs">{
                                Object.keys(country.languages).map(lan =>
                                    <li key={country.languages[lan]}>
                                        <Typography>
                                            • {country.languages[lan]}
                                        </Typography>
                                    </li>
                                )         
                            }
                            </ul> : '—'
                            }
                        </Cell>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Cell>
                            <Typography variant="caption" className="caption" xs={{marginBlock: '-5px'}}>
                                <Flag sx={{fontSize:'1.1rem', margin:'0 5px -3px 0'}}>Building</Flag>
                                flag: 
                            </Typography>
                            <img src={country.flags.png} />
                        </Cell>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CountryInfo;