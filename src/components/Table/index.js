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
        Header: 'Buyer',
        accessor: 'buyer_name'
      },
      {
        Header: 'Country',
        accessor: 'tender_country',
        width: 80
      },
      {
        Header: 'Year',
        accessor: 'tender_year',
        width: 80
      },
    ];

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          className="i-bordered"
        />
      </div>
    );
  }
}

export default Table;
