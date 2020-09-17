import React from "react";

function CalcActions({ startMove, dataScore, dataMove, evaluateResult }) {
  return (
    <div className="calc-body">
      <button
        onClick={() => evaluateResult(true)}
        className="calc-action calc-action--true"
      >
        &#10004;
      </button>
      <button
        onClick={() => evaluateResult(false)}
        className="calc-action calc-action--false"
      >
        &#10006;
      </button>
      <button onClick={startMove} className="calc-action calc-action--restart">
        &#10226;
      </button>
      <button className="calc-action calc-action--disabled calc-action--score">
        {`${dataScore}:${dataMove}`}
      </button>
    </div>
  );
}

export default CalcActions;
