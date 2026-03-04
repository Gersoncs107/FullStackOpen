import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";
import ShowCountry from "./components/ShowCountry";
import CountryForm from "./components/CountryForm";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the countries!", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) => {
    const name =
      country.name?.common ||
      country.name?.official ||
      "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null); // reset details when searching
  };

  return (
    <div className="App">
        <CountryForm text={'Find Countries'} onChange={handleSearch}/>
      <div>
        {searchTerm === "" ? null : filteredCountries.length > 10 ? (
          <p>Too many matches, please be more specific.</p>
        ) : filteredCountries.length === 0 ? (
          <p>No countries found.</p>
        ) : filteredCountries.length === 1 ? (
          <CountryDetails country={filteredCountries[0]} />
        ) : (
          <>
            <ul>
              {filteredCountries.map((country) => (
                <ShowCountry 
                  country={country}
                  onClick={() => setSelectedCountry(country)}
                  key={country.cca3 || country.ccn3 || country.cca2}
                />
              ))}
            </ul>

            {selectedCountry && <CountryDetails country={selectedCountry} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
