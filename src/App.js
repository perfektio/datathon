import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import Procurement from './Pages/Procurement';
import Header from './KOMPONENTIT/Header';
import innovationProcurements from './all.json';

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

  if (!(uniq.length === 1 && uniq[0] == null)) {
    fixedHash[tenderId]['bidders'].push(bidder)
  }
})

const fixedData = Object.keys(fixedHash).map(key => fixedHash[key]);

console.log(fixedData)

const uniqCountries = [{ value: '', label: 'All countries' }];

fixedData.map(pro => pro.tender_country)
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort()
  .forEach((country) => uniqCountries.push({ value: country, label: country }));


class App extends Component {
  render() {

    const DashboardWithParams = () => {
      return (
        <Dashboard
          fixedData={fixedData}
          uniqCountries={uniqCountries}
        />
      )
    }

    const ProcurementWithParams = (location) => {
      const id = location.match.params.id;
      const procurement = fixedHash[id];
      if (!procurement) return <h1>Not found <small>404</small></h1>

      return (
        <Procurement procurement={procurement} />
      )
    }

    return (
      <div>
        <Router>
          <div className="i-container">
            <Header />

            <Route exact path="/" component={DashboardWithParams} />
            <Route path="/procurement/:id" component={ProcurementWithParams} />
          </div>
        </Router>

        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Procuring innovation</strong> by <a href="https://www.perfektio.fi/en">Perfektio</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
