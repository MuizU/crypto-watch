import React, { Component } from "react";
import ExchangeCard from "./ExchangeCard";
import axios from "axios";
import Spinner from "./layout/Spinner";
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
              <ExchangeCard key={i} detail={detail}></ExchangeCard>
            ))}
          </div>
        </div>
      );
    }
  }
}
