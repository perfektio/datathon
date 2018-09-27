import React, { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

import Color from 'color';


import './index.css';

// import geography from './world-50m-simplified.json'
import geography from './europe.json'

class Map extends Component {



  handleClick(geography, evt) {
    console.log("Geography data: ", geography)
  }

  defaultFill(totalHash, id) {
    if (!totalHash[id]) return '#ddd';

    // 20 is the biggest amount
    // we want max lightening of 0.5, hence 40
    const amount = (20 - totalHash[id]) / 40

    return Color('#50E3C2').lighten(amount).string();
  }

  hoverFill(totalHash, id) {
    if (!totalHash[id]) return '#ddd';

    return totalHash[id] ? '#49D8BC' : '#ddd';
  }

  pressedFill(totalHash, id) {
    if (!totalHash[id]) return '#ddd';

    return totalHash[id] ? '#3DC4A9' : '#ddd';
  }

  render() {
    const { data, handleCountrySelect } = this.props;

    const totalHash = data.reduce(
      (totals, tender) => ({ ...totals, [tender.tender_country]: (totals[tender.tender_country] || 0) + 1 }), {}
    );
    const accumulatedTotals = Object.entries(totalHash).sort((a, b) => { return b[1] - a[1] })

    console.log(totalHash)

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
            <Geographies geography={geography}>
              {(geographies, projection) => geographies
              .filter((geography) => {
                return geography.properties.NAME !== "Russia"
              })
              .map(geography => (
                <Geography
                  key={geography.id}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: { fill: this.defaultFill(totalHash, geography.id) },
                    hover:   { fill: this.hoverFill(totalHash, geography.id) },
                    pressed: { fill: this.pressedFill(totalHash, geography.id) },
                  }}
                  onClick={(geo) => {
                    if (totalHash[geo.id]) {
                      handleCountrySelect({ value: geo.id })
                    }
                  }}
                />
              ))}
            </Geographies>
        </ComposableMap>

      </div>
    );
  }
}

export default Map;
