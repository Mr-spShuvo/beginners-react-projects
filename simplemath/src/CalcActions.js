import React from 'react';

function CalcActions() {
  return (
    <div className="calc-body">
      <button className="calc-action calc-action--true">&#10004;</button>
      <button className="calc-action calc-action--false">&#10006;</button>
      <button className="calc-action calc-action--restart">&#9873;</button>
      <button className="calc-action calc-action--score">3:5</button>
    </div>
  );
}

export default CalcActions;
