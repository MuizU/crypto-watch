import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import Spinner from "./layout/Spinner";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <>
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          <Navigation />
        </Suspense>
        <ToastContainer />
        <Footer />
      </>
    </Router>
  );
}

export default App;
