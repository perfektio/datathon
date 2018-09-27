import React, { Component } from 'react';
import Table from './components/Table';
import Map from './components/Map'
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
            <div className="i-app container is-fluid">
                <div className="columns">
                    <div className="column is-one-fifth i-bordered ">
                        <h1 className="App-title"> Innovation procurements <small>in EU</small></h1>
                        <p>This site uses filtered data from Open Tenders Daily to highlight innovation procurements in Europe from 2009 to 2017.
                        </p>
                        <p>This site was built by Perfektio for EU Datathon challenge.</p>
                    </div>
                    <div className="column i-bordered ">
                        <Map data={filteredProcurements} />
                    </div>
                    <div className="column i-bordered ">
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
                    <div className="column i-bordered ">
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
