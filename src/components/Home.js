import React, { Component } from "react";
import CryptoCard from "./CryptoCard";
import axios from "axios";
import Spinner from "./layout/Spinner";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coinDetails: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.coincap.io/v2/assets`);
    if (!!res.data) {
      this.setState({ coinDetails: res.data.data });
    } else {
      console.error(res);
    }
  }
  render() {
    const { coinDetails } = this.state;
    if (this.state.coinDetails.length === 0 && !this.state.loaded) {
      return <Spinner></Spinner>;
    } else {
      return (
        <>
          <div className="container">
            <div className="row">
              {coinDetails.map((detail, i) => (
                <CryptoCard key={i} detail={detail}></CryptoCard>
              ))}
            </div>
          </div>
        </>
      );
    }
  }
}
