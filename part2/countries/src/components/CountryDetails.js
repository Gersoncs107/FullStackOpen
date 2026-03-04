const CountryDetails = ({country}) => {
    const name = country.name?.common || country.name?.official || "No name";
  const capital = Array.isArray(country.capital) ? country.capital.join(", ") : country.capital || "N/A";
  const area = country.area || "N/A";
  const flag = country.flags?.svg || country.flags?.png;
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} km²</p>
      <p>Languages: {languages}</p>
      {flag && <img src={flag} alt={`Flag of ${name}`} style={{ width: "150px", border: "1px solid #ccc" }} />}
    </div>
  )
}

export default CountryDetails