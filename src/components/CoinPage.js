import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./layout/Spinner";
import { roundOff, checkNegative } from "./Helpers";
import moment from "moment";

export default function CoinPage(props) {
  const [coinInfo, setCoinInfo] = useState(null);
  const [coinHistory, setCoinHistory] = useState([]);
  const { id } = useParams();
  const fetchCoinHistory = async (props) => {
    try {
      const resHistory = await axios.get(
        `https://api.coincap.io/v2/assets/${id}/history?interval=h12`
      );
      const coinHistoricalData = resHistory.data.data;
      setCoinHistory(coinHistoricalData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const resInfo = await axios.get(
          `https://api.coincap.io/v2/assets/${id}`
        );
        const coinData = resInfo.data.data;
        setCoinInfo(coinData);
      } catch (e) {
        console.log("ERR: ", e);
      }
    };
    fetchAssets();
  }, [id]);
  if (!!coinInfo) {
    return (
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-4">
            <h1 className="display-3 text-secondary">#{coinInfo.rank}</h1>
          </div>
          <div className="col-4">
            <figure>
              <blockquote className="blockquote">
                <h1 className="display-1">
                  <strong>{coinInfo.name}</strong>
                </h1>
              </blockquote>
              <figcaption className="blockquote-footer">
                <cite title={coinInfo.symbol}>{coinInfo.symbol}</cite>
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
                {roundOff(coinInfo.priceUsd)}
              </h1>
            </div>
            <div className="col-4">
              <h1 className="display-6">
                <strong>Supply:</strong>
                <br />
                &#36;
                {roundOff(coinInfo.supply)}
              </h1>
            </div>
            <div className="col-4">
              <h1 className="display-6">
                <strong>Market Cap:</strong>
                <br />
                &#36;
                {roundOff(coinInfo.marketCapUsd)}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h1>{}</h1>
              <h1 className="display-6">
                <strong>Price Change (24h):</strong>
                <br />
                {checkNegative(coinInfo.changePercent24Hr) ? (
                  <i className="fas fa-arrow-down text-danger"></i>
                ) : (
                  <i className="fas fa-arrow-up text-success"></i>
                )}{" "}
                {roundOff(coinInfo.changePercent24Hr)}
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
                onClick={fetchCoinHistory}
                data-bs-target="#collapseHistory"
                aria-expanded="false"
                aria-controls="collapseHistory"
              >
                <h2 className="accordian-header" id="headingOne">
                  {coinInfo.name} Price History
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
                  {coinInfo.name} Markets
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
