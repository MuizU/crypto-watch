import { Component } from "react";
import { Link } from "react-router-dom";
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
              Supply: {roundOff(this.props.detail.supply)}
              <br />
              Price: &#36;{roundOff(this.props.detail.priceUsd)}
              <br />
              Market Cap: &#36;{roundOff(this.props.detail.marketCapUsd)}
            </p>
            <Link
              to={`/coin/${this.props.detail.id}`}
              className="btn btn-warning btn-block"
            >
              View {this.props.detail.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
