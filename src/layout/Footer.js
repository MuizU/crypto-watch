import React from "react";
import moment from "moment";
// import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-center">
      &copy;<small>Copyright {moment().format("YYYY")} Muiz Uvais</small>
    </footer>
  );

}
export default Footer
