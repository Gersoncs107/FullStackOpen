const ShowCountry = ({ country, onClick }) => {
  return (
    <li>
      {country.name?.common || country.name?.official || "No name"}
      <button onClick={onClick}>Show</button>
    </li>
  );
};

export default ShowCountry;