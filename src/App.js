import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import Spinner from "./components/layout/Spinner";
import Footer from "./components/layout/Footer";

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
        <Footer />
      </>
    </Router>
  );
}

export default App;
