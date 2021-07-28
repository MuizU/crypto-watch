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
          <div className="card">
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
                  <strong>Supply:</strong>
                  <br />
                  &#36;
                  {roundOff(this.state.coinInfo.supply)}
                </h1>
              </div>
              <div className="col-4">
                <h1 className="display-6">
                  <strong>Market Cap:</strong>
                  <br />
                  &#36;
                  {roundOff(this.state.coinInfo.marketCapUsd)}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <h1>{}</h1>
                <h1 className="display-6">
                  <strong>Price Change (24h):</strong>
                  <br />
                  {checkNegative(this.state.coinInfo.changePercent24Hr) ? (
                    <i className="fas fa-arrow-down text-danger"></i>
                  ) : (
                    <i className="fas fa-arrow-up text-success"></i>
                  )}{" "}
                  {roundOff(this.state.coinInfo.changePercent24Hr)}
                  &#37;
                </h1>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="accordian" id="coinAccordian">
              <div className="accordian-item">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseHistory"
                  aria-expanded="false"
                  aria-controls="collapseHistory"
                >
                  <h2 className="accordian-header" id="headingOne">
                    {this.state.coinInfo.name} Price History
                  </h2>
                </button>
                <div
                  id="collapseHistory"
                  className="accordian-collapse collapse"
                  arialabelledby="headingOne"
                  data-bs-parent="#coinAccordian"
                >
                  <div className="accordion-body">
                    <strong>TODO: ADD CHART</strong>
                  </div>
                </div>
              </div>
              <div className="accordian-item">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMarkets"
                  aria-expanded="false"
                  aria-controls="collapseMarkets"
                >
                  <h2 className="accordian-header" id="headingTwo">
                    {this.state.coinInfo.name} Markets
                  </h2>
                </button>
                <div
                  id="collapseMarkets"
                  className="accordian-collapse collapse"
                  arialabelledby="headingTwo"
                  data-bs-parent="#coinAccordian"
                >
                  <div className="accordion-body">
                    <strong>TODO: ADD MARKET</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner></Spinner>;
    }
  }
}
