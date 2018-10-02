import React, { Component } from 'react';
import Select from 'react-select';

import Chart from '../../KOMPONENTIT/Chart';
import Table from '../../KOMPONENTIT/Table';
import Map from '../../KOMPONENTIT/Map';


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



const groupings = [
  { value: "final_price", label: "Final price in EUR" },
  { value: "data_completeness", label: "Data completeness %" },
  { value: "year", label: "Year" },
  { value: "buyer_types", label: "Buyer types" },
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: '',
      filteredProcurements: [],
      grouped_by: 'final_price',
      loaded: false,
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
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
    const { fixedData } = this.props;
    const { searchTender } = this;
    let filtered = fixedData.map(i => i);

    if (country !== '') {
      filtered = filtered.filter(pro => {
        if (searchTender(pro, 'tender_country', country)) return true;
        return false;
      });
    }

    if (search !== '') {
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
    this.setState(
      { country: event.value },
      () => { this.filter() }
    );
  }

  handleGroupSelect(event) {
    this.setState({ grouped_by: event.value });
  }

  render() {
    const {
      filteredProcurements,
      loaded,
      search,
      country,
      grouped_by,
    } = this.state;
    const { uniqCountries } = this.props;

    if (!loaded) return <h1>Loading...</h1>

    return (
      <div className="i-app">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-one-fifth ">
              <div className="i-bordered">
                <h1 className="i-site-title">
                  Innovation procurements
                            <br />
                  <small>in EU</small>
                </h1>
                <p>This site uses filtered data from <a href="https://opentender.eu/">Opentender EU</a> to highlight innovation procurements in Europe from 2009 to 2017.
                          </p>
                <p className="fixed-to-bottom"> This site was built by <a
                  href="https://www.perfektio.fi/en"
                  target="_blank" // eslint-disable-line
                >Perfektio</a> for <a href="https://publications.europa.eu/en/web/eudatathon">EU Datathon 2018 challenge</a>.</p>
              </div>
            </div>
            <div className="column is-two-fifths ">
              <div className="i-bordered">
                <h2>Procurements by country</h2>
                <Map
                  data={filteredProcurements}
                  handleCountrySelect={this.handleCountrySelect}
                />
              </div>
            </div>
            <div className="column is-two-fifths ">
              <div className="i-bordered">
                <h2>Grouped procurements</h2>

                <Select
                  options={groupings}
                  onChange={this.handleGroupSelect}
                  value={groupings.filter((g) => {
                    return g.value === grouped_by;
                  })[0]}
                  styles={selectStyles}
                />

                <br />

                <Chart
                  data={filteredProcurements}
                  selected={grouped_by}
                />
              </div>
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
                  return c.value === country;
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
