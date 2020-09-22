import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  // below i use UseEffect for runs a piece of code based on a given condition

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries`)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States,France,United Kingdom
            value: country.countryInfo.iso2, //USA,FR,UK
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log("test>>>>", countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1> {/* Header */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox cases={12345} title="Coronavirus cases" total={200} />
          <InfoBox cases={34566} title="Recovered" total={400} />
          <InfoBox cases={765544} title="Death" total={150} />
        </div>

        <Map />
        {/* Map */}
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
