import React, { Component } from "react";
import { roundOff } from "./Helpers.js";
export default class CryptoCard extends Component {
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
              Rate: &#36;{roundOff(this.props.detail.rateUsd)}
              <br />
              {!!this.props.detail.currencySymbol &&
                `
                Currency Symbol: ${this.props.detail.currencySymbol}
                `}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
