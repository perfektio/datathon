import React, { Component } from 'react';
import Table from './components/Table';
import innovationProcurements from './all.json';

import './bulma.min.css';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredProcurements: [],
            procurements: [],
        };
    }

    componentDidMount() {
        this.setState({
            procurements: innovationProcurements,
        }, () => {
            this.filter();
        })
    }

    // TODO
    filter() {
        const { procurements } = this.state;

        this.setState({
            filteredProcurements: procurements,
        })
    }

    render() {
        const { filteredProcurements } = this.state;

        if (filteredProcurements.length === 0) return (<h1>Loading</h1>)

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
                    <ul>
                        {/* {Object.keys(filteredProcurements[0]).map((item) =>
                            <li>item</li>
                        )} */}
                    </ul>
                </div>
                <div className="columns">
                    <div className="column">
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
