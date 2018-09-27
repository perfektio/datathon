import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

import './index.css';

import geography from './world-50m-simplified.json'

class Map extends Component {



  handleClick(geography, evt) {
    console.log("Geography data: ", geography)
  }


  render() {
    const { data } = this.props;

    const accumulatedTotals = Object.entries(data.reduce(
      (totals, tender) => ({ ...totals, [tender.tender_country]: (totals[tender.tender_country] || 0) + 1 }), {}
    )).sort((a, b) => { return b[1] - a[1] })

    return (
      <div className="i-map">
        <div className="i-map--list-country-container">
          {accumulatedTotals.map((item, key) => (
            <div key={key} className="i-map--list-country">
              <span>{item[0]}</span>
              {item[1]}
            </div>
          ))}
        </div>
        <ComposableMap>
          <ZoomableGroup>
            <Geographies geography={geography}>
              {(geographies, projection) => geographies
              .filter((geography) => {
                return geography.properties.REGION_UN === "Europe"
              })
              .filter((geography) => {
                return geography.properties.NAME !== "Russia"
              })
              .map(geography => (
                <Geography
                  key={geography.id}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: { fill: "#666" },
                    hover:   { fill: "#999" },
                    pressed: { fill: "#000" },
                  }}
                  onClick={this.handleClick}

                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default Map;
