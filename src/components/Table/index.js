import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactTable from "react-table";

import 'react-table/react-table.css'

class Table extends Component {
  render() {
    const { data } = this.props;

    const columns = [
      {
        Header: 'Title',
        accessor: 'tender_title',
        Cell: cell => {
          const title = cell.row.tender_title;
          const id = cell.row._original.tender_id;

          return (
            <Link to={`/procurement/${id}`}>{ title }</Link>
          );
        }
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
