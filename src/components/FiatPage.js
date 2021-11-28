import React, {useEffect} from "react";
import DisplayCard from "./DisplayCard";
import Spinner from "../layout/Spinner";
import {roundOff} from "../helpers";
import {useSelector, useDispatch} from "react-redux";
import {LoadingState} from "../constants";
import {fetchRates} from "./fiatSlice";
const FiatPage = () => {
  const dispatch = useDispatch()
  const {fiat: {status}} = useSelector(state => state)
  const {fiat: {fiatDetails}} = useSelector(state => state)

  useEffect(() => {
    if (status === LoadingState.idle) {
      dispatch(fetchRates())
    }
  })
  if (fiatDetails.length === 0 && [LoadingState.success, LoadingState.idle].includes(status)) {
    return (<Spinner />)
  } else {
    return (
      <div className="container">
        <div className="row pt-4 mb-5">
          {fiatDetails.map((detail, i) => (
            <DisplayCard
              detailName={detail.name}
              detailSymbol={detail.symbol}
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
export default FiatPage
