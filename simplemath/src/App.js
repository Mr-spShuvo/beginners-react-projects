import React, { Component } from "react";
import "./App.css";
import CalcScreen from "./CalcScreen";
import CalcActions from "./CalcActions";
import { getDigits, getFormatDigits, getResult, getShuffledResult } from "./SimpleMath";

class App extends Component {
  state = {
    dataScore: 0,
    dataMove: 0,
    dataDigits: "3 + 4 + 5",
    dataResult: 12,
    correctAns: [true],
  };

  componentWillMount() {
    this.nextMove();
  }

  nextMove = () => {
    const digits = getDigits();
    const result = getResult(digits);
    const shuffledResult = getShuffledResult(result);
    this.setState({ correctAns: [result === shuffledResult, result] });
    this.setState({ dataDigits: getFormatDigits(digits) });
    this.setState({ dataResult: shuffledResult });
  };

  evaluateResult = (ans) => {
    if (ans === this.state.correctAns[0]) {
      this.setState(({ dataMove }) => ({ dataMove: dataMove + 1 }));
      this.setState(({ dataScore }) => ({ dataScore: dataScore + 1 }));
    } else {
      this.setState(({ dataMove }) => ({ dataMove: dataMove + 1 }));
    }
    this.nextMove();
  };

  startMove = () => {
    this.nextMove();
    if (this.state.dataMove) {
      this.setState({ dataMove: 0 });
      this.setState({ dataScore: 0 });
    }
  };

  render() {
    const { dataDigits, dataResult, dataScore, dataMove } = this.state;
    return (
      <div className="app">
        <div className="calculator">
          <CalcScreen dataDigits={dataDigits} dataResult={dataResult} />
          <CalcActions
            startMove={this.startMove}
            dataScore={dataScore}
            dataMove={dataMove}
            evaluateResult={this.evaluateResult}
          />
        </div>
      </div>
    );
  }
}

export default App;
