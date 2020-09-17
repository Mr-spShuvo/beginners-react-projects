import React from "react";

function CalcScreen({ dataDigits, dataResult }) {
  return (
    <div className="calc-header">
      <p className="calc-timer">
        <span className="calc-clock">&#x262F;</span> 10 s
      </p>
      <div className="calc-screen">
        <div className="calc-digits">{dataDigits}</div>
        <div className="calc-equal"> &#61; </div>
        <div className="calc-result">{dataResult}</div>
      </div>
    </div>
  );
}

export default CalcScreen;
