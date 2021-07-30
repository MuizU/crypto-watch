import React, { Component } from "react";
import DisplayCard from "./DisplayCard";
import axios from "axios";
import Spinner from "./layout/Spinner";
import { roundOff } from "./Helpers";
import { Link } from "react-router-dom";
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
            <div className="row pt-4 mb-5">
              {coinDetails.map((detail, i) => (
                <DisplayCard
                  detail={detail}
                  key={i}
                  cardText={
                    <span>
                      Supply: {roundOff(detail.supply)}
                      <br />
                      Price: &#36;{roundOff(detail.priceUsd)}
                      <br />
                      Market Cap: &#36;
                      {roundOff(detail.marketCapUsd)}
                    </span>
                  }
                  btn={
                    <Link
                      to={`/coin/${detail.id}`}
                      className="btn btn-warning btn-block"
                    >
                      View {detail.name}
                    </Link>
                  }
                />
              ))}
            </div>
          </div>
        </>
      );
    }
  }
}
