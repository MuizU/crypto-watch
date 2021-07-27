import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <>
        <Navigation></Navigation>
        <Footer></Footer>
      </>
    </Router>
  );
}

export default App;
