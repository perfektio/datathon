import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

const specialKeys = [
  'tender_title',
  'buyer_name',
]

class Procurement extends Component {

  print(key, pre) {
    return key
      .replace(pre, "")
      .replace("_", " ")
  }

  render() {
    const { procurement } = this.props;

    const notSpecialKeys = Object.keys(procurement).filter(key => !specialKeys.includes(key));
    console.log(notSpecialKeys)
    const tenderKeys = notSpecialKeys.filter(key => key.includes("tender_"))
    const lotKeys = notSpecialKeys.filter(key => key.includes("lot_"))
    const buyerKeys = notSpecialKeys.filter(key => key.includes("buyer_"))

    return (
      <div className="i-app">
        <div className="container is-fluid">

          <Link to="/">
            Back to all procurements
          </Link>

          <br />
          <br />

          <div className="columns">
            <div className="column i-bordered ">
              <h1>
                { procurement.tender_title }
                <br />
                <small>{ procurement.buyer_name }</small>
              </h1>
            </div>
          </div>

          <br />

          <div className="columns">

            <div className="column i-bordered ">
              <h2>Tender</h2>
              <table className="procurement-table">
                <tbody>
                  { tenderKeys.map((key) => {
                    return (
                      <tr>
                        <td>{ this.print(key, "tender_") }</td>
                        <td>{ procurement[key] }</td>
                      </tr>
                    )
                  }) }
                </tbody>
              </table>
            </div>

            <div className="column">
              <div className="i-bordered ">
                <h2>Buyer</h2>
                <table className="procurement-table">
                  <tbody>
                    { buyerKeys.map((key) => {
                      return (
                        <tr key={key}>
                          <td>{ this.print(key, "buyer_") }</td>
                          <td>{ procurement[key] }</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>
              </div>

              <div className="i-bordered ">
                <h2>Lot</h2>
                <table className="procurement-table">
                  <tbody>
                    { lotKeys.map((key) => {
                      return (
                        <tr key={key}>
                          <td>{ this.print(key, "lot_") }</td>
                          <td>{ procurement[key] }</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>
            </div>
            </div>

            <div className="column">
              <div className="i-bordered ">
                <h2>Bidders</h2>

                { /* TODO below*/ }
                { procurement.bidders.length === 0
                  ? <p>No bidder data available</p>
                  : (
                      <div>
                        { procurement.bidders.map((bidder) => {
                          return (
                            <Fragment key={`f-${bidder.bidder_id}`}>
                              <h3>{ bidder['bidder_name'] }</h3>
                              <table className="procurement-table">
                                <tbody>
                                { Object.keys(bidder).map((key) => {
                                  if (key === "bidder_name") return null;
                                  return (
                                    <tr key={`tr-${key}`}>
                                      <td>{ this.print(key, "") }</td>
                                      <td>{ bidder[key] }</td>
                                    </tr>
                                  )
                                }) }
                              </tbody>
                            </table>
                            <hr />
                          </Fragment>
                        )
                      }) }
                    </div>
                  )
                }

              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Procurement;
