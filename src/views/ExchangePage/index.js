import React, {useEffect} from "react";
import Spinner from "layout/Spinner";
import DisplayCard from "components/DisplayCard";
import {roundOff, numberWithCommas, removeTrailingZeros} from "utils/helpers.js";
import {fetchExchanges} from 'views/ExchangePage/exchangeSlice'
import {useDispatch, useSelector} from 'react-redux'
import {LoadingState} from 'utils/constants'

const Home = () => {
  const exchangeDetails = useSelector(state => state.exchange.exchanges)
  const status = useSelector(state => state.exchange.exchangeStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === LoadingState.idle) {
      dispatch(fetchExchanges())
    }
  }, [status, dispatch])

  if (exchangeDetails.length === 0 && status !== LoadingState.success) {
    return <Spinner />
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
export default Home
