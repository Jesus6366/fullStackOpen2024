import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

// const CountryDetails = ({ country }) => {


//   return (
//     <div>
//       <h2>{country.name.common}</h2>
//       <p>Capital: {country.capital}</p>
//       <p>Area: {country.area} km²</p>
//       <p>Languages: {Object.values(country.languages).join(', ')}</p>
//       <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '100px' }} />
//     </div>
//   );
// };

function App() {
  const [searchCountry, setSearchCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  const fetchCountries = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <>
      <h3>Find Countries: <input type="text" onChange={handleSearch} value={searchCountry} /></h3>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>Show</button>
            </li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <p>No matches found</p>
      )}
    </>
  );
}

export default App;
