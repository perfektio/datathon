import React, { Component } from 'react';


class Card extends Component {


  render() {
    return (
      <div className="column ">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {this.props.type}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {this.props.name}

            </div>
          </div>
          <footer class="card-footer">
            <a href={this.props.link} className="card-footer-item">Open</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Card;
