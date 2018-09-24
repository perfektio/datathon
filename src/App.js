import React, { Component } from 'react';

import './bulma.min.css';
import './App.css';

import innovationProcurements from './all.json';

class App extends Component {
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column is-one-fifth">

            <div className="App">
              <h1 className="App-title">
                Innovation procurements
                <small>in EU</small>
              </h1>
            </div>

          </div>
          <div className="column">

            here is map

          </div>
          <div className="column">

            here is graph

          </div>
        </div>

        <div className="columns">
          <div className="column">
            this is table

            { innovationProcurements.map((data, key) => {
              return(
                <div key={key}>
                  <b>{ data.tender_title }</b>
                  <br />{ data.buyer_name }
                  <br />
                </div>
              )
            }) }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
