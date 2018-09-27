import React, { Component } from 'react';
import innovationProcurements from './all.json';

import Dashboard from './Pages/Dashboard';

import './bulma.min.css';
import './App.css';


const fixedHash = {};
innovationProcurements.forEach((pro) => {
  const bidderKeys = Object.keys(pro).filter(key => (key.includes("bid_") || key.includes("bidder")))
  const bidder = {};
  bidderKeys.forEach(key => bidder[key] = pro[key]);

  const tenderId = pro.tender_id;
  if (!fixedHash[tenderId]) {
    const tenderKeys = Object.keys(pro).filter(key => !(key.includes("bid_") || key.includes("bidder")))
    const tender = { bidders: [] };
    tenderKeys.forEach(key => tender[key] = pro[key]);

    fixedHash[tenderId] = tender;
  }


  // Some bidder data is empty so we dont show them as bidders
  const uniq = Object.values(bidder).filter((v, i, a) => a.indexOf(v) === i);

  if ( !(uniq.length === 1 && uniq[0] == null) ) {
    fixedHash[tenderId]['bidders'].push(bidder)
  }
})

const fixedData = Object.keys(fixedHash).map(key => fixedHash[key]);

console.log(fixedData)

const uniqCountries = [ {value: '', label: 'All countries'} ];

fixedData.map(pro => pro.tender_country)
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort()
  .forEach((country) => uniqCountries.push({ value: country, label: country }));


class App extends Component {
    render() {
        return (
          <Dashboard
            fixedData={fixedData}
            uniqCountries={uniqCountries}
          />
        );
    }
}

export default App;
