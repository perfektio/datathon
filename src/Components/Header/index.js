import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';


class Header extends Component {
  render() {


    return (
      <div className="i-header">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="i-app-name">Procuring innovation</div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link to="/">Procurement data</Link>
              <Link to="/">More information about the project</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
