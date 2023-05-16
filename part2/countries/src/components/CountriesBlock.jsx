
import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'

const CounriesBlock = ({search, countries}) => {
    const filteredCountries = countries
    .filter(country => country.name.common.toLowerCase().search(search.toLowerCase().trim()) == 0)
    return (
        <div className='country-block'>
            {(filteredCountries.length > 1 || filteredCountries.length === 0) ? 
                <CountriesList search={search} countries={filteredCountries} /> :
                <CountryInfo country={filteredCountries[0]} />}
        </div>
    )
}

export default CounriesBlock;