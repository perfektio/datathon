import React, { Component } from 'react';
import Select from 'react-select';


import Chart from './components/Chart';
import Table from './components/Table';

import Map from './components/Map'
import innovationProcurements from './all.json';

import './bulma.min.css';
import './App.css';


const selectStyles = {
  option: (base, state) => ({
    ...base,
  }),
  control: (base) => ({
    ...base,
    background: '#fff',
    borderColor: '#e5e9f2',
    marginRight: '-0.75rem',
    padding: '5px 7px',
  }),
}


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
    constructor(props) {
      super(props);

      this.state = {
        country: '',
        filteredProcurements: [],
        loaded: false,
        search: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleCountrySelect = this.handleCountrySelect.bind(this);
      this.searchTender = this.searchTender.bind(this);
    }

    componentDidMount() {
      this.filter();
    }

    searchTender(procurement, key, search) {
      if (!procurement[key]) return false;

      return procurement[key].toLowerCase().includes(search.toLowerCase());
    }

    filter() {
      const { search, country } = this.state;
      const { searchTender } = this;
      let filtered = fixedData.map(i => i);

      if (country != '') {
        filtered = filtered.filter(pro => {
          if (searchTender(pro, 'tender_country', country)) return true;
          return false;
        });
      }

      if (search != '') {
        filtered = filtered.filter(pro => {
          if (searchTender(pro, 'tender_title', search)) return true;
          if (searchTender(pro, 'tender_year', search)) return true;
          if (searchTender(pro, 'lot_title', search)) return true;
          if (searchTender(pro, 'buyer_name', search)) return true;
          if (searchTender(pro, 'buyer_city', search)) return true;
          if (searchTender(pro, 'buyer_country', search)) return true;

          return false;
        })
      }

      this.setState({
        filteredProcurements: filtered,
        loaded: true,
      })
    }

    handleChange(event) {
      this.setState(
        { search: event.target.value },
        () => { this.filter() }
      );
    }

    handleCountrySelect(event) {
      console.log(event)
      this.setState(
        { country: event.value },
        () => { this.filter() }
      );
    }

    render() {
        const { filteredProcurements, loaded, search, country } = this.state;

        if (!loaded) return <h1>Loading...</h1>

        return (
            <div className="i-app">
              <div className="container is-fluid">
                  <div className="columns">
                      <div className="column is-one-fifth i-bordered ">
                          <h1 className="App-title">
                            Innovation procurements
                            <br />
                            <small>in EU</small>
                          </h1>
                          <p>This site uses filtered data from Open Tenders Daily to highlight innovation procurements in Europe from 2009 to 2017.
                          </p>
                          <p>This site was built by Perfektio for EU Datathon challenge.</p>
                      </div>
                      <div className="column is-two-fifths i-bordered ">
                        <h2>Procurements by country</h2>
                        <Map
                          data={filteredProcurements}
                          handleCountrySelect={this.handleCountrySelect}
                        />
                      </div>
                      <div className="column is-two-fifths i-bordered ">
                        <h2>Grouped by final EUR</h2>
                        <Chart data={filteredProcurements} />
                      </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <input
                        type="text"
                        className="search-field"
                        onChange={this.handleChange}
                        value={search}
                        placeholder={"Type to search procurements..."}
                      />
                    </div>
                    <div className="column">
                      <Select
                        options={uniqCountries}
                        onChange={this.handleCountrySelect}
                        value={uniqCountries.filter((c) => {
                          return c.label === country;
                        })[0]}
                        placeholder="All countries"
                        styles={selectStyles}
                      />
                    </div>
                  </div>

                  <div className="columns">
                      <div style={{ width: '100%' }}>
                          <Table
                              data={filteredProcurements}
                          />
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

export default App;
