import React, { Component } from "react";
import DisplayCard from "./DisplayCard";
import axios from "axios";
import Spinner from "./layout/Spinner";
import { roundOff, numberWithCommas, removeTrailingZeros } from "./Helpers.js";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangeDetails: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.coincap.io/v2/exchanges`);
    if (!!res.data) {
      const exchangeDetails = res.data.data;
      this.setState({ exchangeDetails });
    } else {
      console.error(res);
    }
  }
  render() {
    const { exchangeDetails } = this.state;
    if (this.state.exchangeDetails.length === 0 && !this.state.loaded) {
      return <Spinner></Spinner>;
    } else {
      return (
        <div className="container">
          <div className="row pt-4 mb-5">
            {exchangeDetails.map((detail, i) => (
              <DisplayCard
                key={i}
                detail={detail}
                cardText={
                  <span>
                    Volume:&#160;
                    <strong>
                      &#36;{numberWithCommas(roundOff(detail.volumeUsd))}
                    </strong>
                    <br />
                    Total Volume &#37;:&#160;
                    <strong>
                      {removeTrailingZeros(
                        roundOff(detail.percentTotalVolume),
                        detail.name
                      )}
                      &#37;
                    </strong>
                    <br />
                    Trading Pairs: <strong>{detail.tradingPairs}</strong>
                  </span>
                }
                btn={
                  <a
                    href={detail.exchangeUrl}
                    target="_blank"
                    className="btn btn-warning btn-block"
                    rel="noreferrer"
                  >
                    Visit {detail.name}
                  </a>
                }
              />
              // <ExchangeCard key={i} detail={detail}></ExchangeCard>
            ))}
          </div>
        </div>
      );
    }
  }
}
