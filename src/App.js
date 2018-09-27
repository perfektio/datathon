import React, { Component } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';

import Map from './components/Map'
import innovationProcurements from './all.json';

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

const uniqCountries = fixedData.map(pro => pro.tender_country).filter((v, i, a) => a.indexOf(v) === i);


class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        filteredProcurements: [],
        search: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.searchTender = this.searchTender.bind(this);
    }

    componentDidMount() {
      this.filter();
    }

    searchTender(procurement, key, search) {
      if (!procurement[key]) return false;

      return procurement[key].toLowerCase().includes(search);
    }

    filter() {
      const { search } = this.state;
      const { searchTender } = this;
      let filtered;

      if (search != '') {
        filtered = fixedData.filter(pro => {
          if (searchTender(pro, 'tender_title', search)) return true;
          if (searchTender(pro, 'tender_year', search)) return true;
          if (searchTender(pro, 'lot_title', search)) return true;
          if (searchTender(pro, 'buyer_name', search)) return true;
          if (searchTender(pro, 'buyer_city', search)) return true;
          if (searchTender(pro, 'buyer_country', search)) return true;

          return false;
        })
      } else {
        filtered = fixedData.filter(pro => {
          return true;
        });
      }

      this.setState({
        filteredProcurements: filtered,
      })
    }

    handleChange(event) {
      this.setState({ search: event.target.value.toLowerCase() },
      () => { this.filter() });
    }

    render() {
        const { filteredProcurements, search } = this.state;

        return (
            <div className="i-app container is-fluid">
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
                      <h2>By countries</h2>
                      <Map data={filteredProcurements} />
                    </div>
                    <div className="column is-two-fifths i-bordered ">
                      <h2>By final EUR</h2>
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
                </div>
                <div className="columns">
                    <div style={{ width: '100%' }}>
                        <Table
                            data={filteredProcurements}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
