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
    ];

    return (
      <ReactTable
        data={data}
        columns={columns}
      />
    );
  }
}

export default Table;
