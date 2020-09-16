import React from 'react';
import './App.css';
import CalcScreen from './CalcScreen';
import CalcActions from './CalcActions';

function App() {
  return (
    <div className="app">
      <div className="calculator">
        <CalcScreen />
        <CalcActions />
      </div>
    </div>
  );
}

export default App;
