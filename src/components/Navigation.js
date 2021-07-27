import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import CoinPage from "./CoinPage";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" as={Link} to="/" href="/">
                Crypto Watch
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/"
                      as={Link}
                      to="/"
                    >
                      Crypto Rates
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" as={Link} href="/fiat" to="/fiat">
                      Fiat Exchange Rates
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      as={Link}
                      href="/exchanges"
                      to="/exchanges"
                    >
                      Crypto Exchanges
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      as={Link}
                      href="/markets"
                      to="/markets"
                    >
                      Crypto Markets
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            {/* <Route exact path="/fiat" component={Fiat}></Route> */}
            {/* <Route exact path="/exchanges" component={Exchanges}></Route> */}
            {/* <Route exact path="/markets" component={Markets}></Route> */}
            <Route path="/coin/:id" component={CoinPage}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
