import React from "react";
import loader from "../loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
