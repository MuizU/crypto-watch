import React, { Component } from "react";
import DisplayCard from "./DisplayCard";
import axios from "axios";
import Spinner from "./layout/Spinner";
import { getCurrencyNameFromId, roundOff } from "./Helpers";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fiatDetails: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.coincap.io/v2/rates`);
    if (!!res.data) {
      const fiatDetails = res.data.data
        .filter((curr) => curr.type === "fiat")
        .map((curr) => ({ ...curr, name: getCurrencyNameFromId(curr.id) }));
      this.setState({ fiatDetails });
    } else {
      console.error(res);
    }
  }
  render() {
    const { fiatDetails } = this.state;
    if (this.state.fiatDetails.length === 0 && !this.state.loaded) {
      return <Spinner></Spinner>;
    } else {
      return (
        <div className="container">
          <div className="row pt-4 mb-5">
            {fiatDetails.map((detail, i) => (
              //<FiatCard key={i} detail={detail}></FiatCard>
              <DisplayCard
                detail={detail}
                key={i}
                cardText={
                  <span>
                    Rate: &#36;{roundOff(detail.rateUsd)}
                    <br />
                    {!!detail.currencySymbol &&
                      `
                Currency Symbol: ${detail.currencySymbol}
                `}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
