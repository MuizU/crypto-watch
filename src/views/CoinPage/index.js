import {useParams, useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Spinner from "layout/Spinner";
import {roundOff, checkNegative} from "utils/helpers";
import moment from "moment";
import {Line} from "react-chartjs-2";
import {fetchCoin, fetchCoinHistory} from './coinSlice'
import {useSelector, useDispatch} from 'react-redux'
import {LoadingState} from 'utils/constants'


export default function CoinPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const coinInfo = useSelector(state => state.coin.coinInfo)
  const coinInfoStatus = useSelector(state => state.coin.status)
  const coinHistoryStatus = useSelector(state => state.coin.coinHistoryStatus)
  const coinHistoricalData = useSelector(state => state.coin.coinHistoricalData)
  const {id} = useParams();
  const [chartData, setChartData] = useState(null);
  const [chartOptions] = useState({
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
        },
      ],
    },
  });
  const formatDateChart = (date) => {
    return moment(date).format("MMM YYYY");
  };
  useEffect(() => {
    if (!!id) {
      if (coinInfoStatus === LoadingState.idle) {
        dispatch(fetchCoin(id))
      }

      if (coinHistoryStatus === LoadingState.idle) {
        dispatch(fetchCoinHistory(id))
      }
    }
    if (coinHistoryStatus === LoadingState.success && coinInfoStatus === LoadingState.success) {

      const chartConfig = {
        labels: coinHistoricalData.slice().map((a) => formatDateChart(a.date)),
        datasets: [
          {
            label: `${coinInfo["name"]} Valuation`,
            data: coinHistoricalData.slice().map((a) => a.priceUsd),
            fill: true,
            backgroundColor: "rgba(52, 152, 219, 0.75)",
          },
        ],
      };
      setChartData(chartConfig);
    }
  }, [id, coinHistoryStatus, coinHistoricalData, coinInfo, dispatch, coinInfoStatus]);

  const goBack = () => {
    history.goBack()
  }
  if (!!coinInfo) {
    return (
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-4">
            <button onClick={() => goBack()}>back</button>
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
          <h3 className="display-3">{coinInfo.name} Valuation History</h3>
          <Line data={chartData} options={chartOptions}></Line>
        </div>
      </div>
    );
  } else {
    return <Spinner />
  }
}
