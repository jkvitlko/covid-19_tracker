import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, CardContent, Card } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map.js';
import Table from './Table.js';
import {sortData , prettyPrintStat} from './util';
import LineGraph from './LineGraph.js';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Wolrdwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData , setTableData] = useState([]);
  const [mapCenter , setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom]= useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType , setCasesType]=useState('cases')

  useEffect(() =>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=> response.json())
    .then(data =>{
      setCountryInfo(data);
    })
  }, [])
  useEffect(() => {
    getCountriesData();

    
  }, []);


  const getCountriesData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        const countryObj = data.map((country) => (
          {
            name: country.country,// name like India . Unitated states
            value: country.countryInfo.iso2, // code like USA, UK
          }
        ));
        const sortedData = sortData(data);
        setTableData(sortedData)
        setMapCountries(data);
        setCountries(countryObj);
      })
  }

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "Worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  }

  return (
    <div className="app">
      <div className="app-left">
        <div className="app-header">
          <h1>COVID-19 Tracker</h1>
          <FormControl>
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value={country}>Worldwide</MenuItem>

              {countries.map((country, index) =>
                (<MenuItem key={index} value={country.value}>{country.name} </MenuItem>)
              )}

            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          <InfoBox isRed active={casesType=='cases'} onClick={(e) => setCasesType('cases')} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active={casesType=='recovered'} onClick={(e) => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox isRed active={casesType=='deaths'} onClick={(e) => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        {mapCountries? (<Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />) : (<h4>No data </h4>)}
        
      </div>
      <Card className="app-right">
        <CardContent>

          <h4>Live Cases by Country</h4>
                <Table countries={tableData}/>
              <h3>Worldwide new {casesType}</h3>
                <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>

  );
}

export default App;
