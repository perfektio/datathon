import React, { Component } from 'react';

import ReactTable from "react-table";

import 'react-table/react-table.css'

class Table extends Component {

  render() {
    const { data } = this.props;

    const columns = [
      {
        Header: 'Title',
        accessor: 'tender_title'
      },
      {
        Header: 'Country',
        accessor: 'tender_country'
      },
      {
        Header: 'Year',
        accessor: 'tender_year'
      },
      {
        Header: 'Awarded',
        accessor: 'tender_isAwarded'
      },


    ];

    return (
      <ReactTable
        data={data}
        columns={columns}
        className="i-bordered"
      />
    );
  }
}

export default Table;
