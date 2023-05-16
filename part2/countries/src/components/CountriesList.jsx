import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CountryInfo from "./CountryInfo";

const CountriesList = ({countries, search}) => {

    return (
    (countries.length >= 10 && search != '') ? 
        <Typography align="center">
            {countries.length} is too many matches...
        </Typography> :
        (countries.length != 0 && search != '') ?
        <div>
            {countries
            .map(
                (country, i) => {
                    return (
                        <Accordion sx={{
                            marginTop: '5px',
                            border: '1px solid transparent'
                          }} key={country.name.common}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                id={`panel${i+1}-header`}
                            >
                                <Typography key={country.name.common} fontWeight={400} variant="h2" fontSize='1.2rem'>
                                    {country.name.common}
                                </Typography>
                            </AccordionSummary>
                            
                            <AccordionDetails sx={{marginTop: '-15px'}}>
                                <CountryInfo country={country} header={false} />
                            </AccordionDetails>
                    </Accordion>
                )}
            )}
        </div> : search === '' ? null : <Typography align="center">Nothing found!</Typography>
    )
}

export default CountriesList;