import React, {useEffect} from "react";
import DisplayCard from "./DisplayCard";
import Spinner from "../layout/Spinner";
import {roundOff} from "../helpers";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchAsset} from "./homeSlice";
import {LoadingState} from "../constants";

const Home = () => {
  const dispatch = useDispatch()
  const coinDetails = useSelector(state => state.home.coinDetails)
  const status = useSelector(state => state.home.status)
  useEffect(() => {
    if (status === LoadingState.idle) {
      dispatch(fetchAsset())
    }
  }, [dispatch, status])

  if (coinDetails.length === 0 && [LoadingState.idle, LoadingState.loading].includes(status)) {
    return (<Spinner />)
  } else {
    return (
      <>
        <div className="container">
          <div className="row pt-4 mb-5">
            {coinDetails.map((detail, i) => (
              <DisplayCard
                detailName={detail.name}
                detailSymbol={detail.symbol}
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
export default Home
