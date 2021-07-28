import React, { Component } from "react";
import { roundOff } from "./Helpers.js";
export default class ExchangeCard extends Component {
  render() {
    return (
      <div className="col pb-4">
        <div className="card" style={{ width: "24rem" }}>
          <div className="card-body mb-4 p-4">
            <h5 className="card-title">{this.props.detail.name}</h5>
            <h6 className="card-subtitle mb2 text-muted">
              {this.props.detail.symbol}
            </h6>
            <p className="card-text">
              Volume: {roundOff(this.props.detail.volumeUsd)}
              <br />
              Total Volume &#37;: {roundOff(this.props.detail.priceUsd)}&#37;
              <br />
              Trading Pairs: {this.props.detail.tradingPairs}
            </p>
            <a
              href={this.props.detail.exchangeUrl}
              target="_blank"
              className="btn btn-warning btn-block"
              rel="noreferrer"
            >
              Visit {this.props.detail.name}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
