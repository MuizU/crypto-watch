import React, {Component, lazy} from "react";
import {Switch, Route, NavLink} from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const CoinPage = lazy(() => import("./components/CoinPage"));
const FiatPage = lazy(() => import("./components/FiatPage"));
const ExchangePage = lazy(() => import("./components/ExchangePage"));

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <div className="container-fluid">
              <NavLink
                exact
                activeClassName="active"
                className="navbar-brand"
                to="/"
              >
                Crypto Watch
              </NavLink>
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
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      aria-current="page"
                      to="/"
                    >
                      Crypto Rates
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      aria-current="page"
                      to="/fiat"
                    >
                      Fiat Exchange Rates
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      aria-current="page"
                      to="/exchanges"
                    >
                      Crypto Exchanges
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/fiat" component={FiatPage}></Route>
            <Route exact path="/exchanges" component={ExchangePage}></Route>
            <Route path="/coin/:id" component={CoinPage}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
