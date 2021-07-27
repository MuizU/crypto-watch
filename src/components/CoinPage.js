import React, { Component } from "react";
import axios from "axios";
import Spinner from "./layout/Spinner";
import { roundOff, checkNegative } from "./Helpers";

export default class CoinPage extends Component {
  constructor(props) {
    super(props);

    this.state = { coinInfo: null, coinHistory: [], exchangeInfo: [] };
  }
  fetchAssets = async () => {
    const resInfo = await axios.get(
      `https://api.coincap.io/v2/assets/${this.props.match.params.id}`
    );
    const coinInfo = resInfo.data.data;
    this.setState({ coinInfo });
  };
  componentDidMount() {
    this.fetchAssets();
  }
  render() {
    if (!!this.state.coinInfo) {
      return (
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-4">
              <h1 className="display-3 text-secondary">
                #{this.state.coinInfo.rank}
              </h1>
            </div>
            <div className="col-4">
              <figure>
                <blockquote className="blockquote">
                  <h1 className="display-1">
                    <strong>{this.state.coinInfo.name}</strong>
                  </h1>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <cite title={this.state.coinInfo.symbol}>
                    {this.state.coinInfo.symbol}
                  </cite>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="row ">
            <div className="col-4">
              <h1 className="display-6">
                <strong>Price:</strong>
                <br />
                &#36;
                {roundOff(this.state.coinInfo.priceUsd)}
              </h1>
            </div>
            <div className="col-4">
              <h1 className="display-6">
                <strong>Supply:</strong> &#36;
                {roundOff(this.state.coinInfo.supply)}
              </h1>
            </div>
            <div className="col-4">
              <h1 className="display-6">
                <strong>Market Cap:</strong> &#36;
                {roundOff(this.state.coinInfo.marketCapUsd)}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h1 className="display-6">
                <strong>Price Change (24h):</strong>
                <i class="fas fa-arrow-down"></i>
                {!!checkNegative(this.state.coinInfo.changePercent24Hr) ? (
                  <i class="fas fa-arrow-down"></i>
                ) : (
                  <i class="fas fa-arrow-up"></i>
                )}
              </h1>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner></Spinner>;
    }
  }
}
