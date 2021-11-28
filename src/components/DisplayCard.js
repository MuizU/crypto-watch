import React from 'react'
const DisplayCard = ({cardText, detailName, detailSymbol, btn}) => {
  return (
    <div className="col pb-4" >
      <div className="card" style={{width: "24rem"}}>
        <div className="card-body mb-4 p-4">
          <h5 className="card-title">{detailName}</h5>
          <h6 className="card-subtitle mb2 text-muted">
            {detailSymbol}
          </h6>
          <p className="card-text">{cardText}</p>
          {btn}
        </div>
      </div>
    </div >
  );
}

export default DisplayCard
