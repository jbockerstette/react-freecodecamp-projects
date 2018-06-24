import React from 'react';
import './Calculator.css';
import keys from './keys';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', output: '0' };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(key) {
    console.log(key);
  }
  render() {
    return (
      <div className="calc-grid">
        <div id="calc-window">
          <div id="input">input</div>
          <div id="display">results</div>
        </div>
        {keys.map(key => (
          <button
            key={key.id}
            id={key.id}
            onClick={() => this.handleClick(key.text)}
          >
            {key.text}
          </button>
        ))}
      </div>
    );
  }
}

export default Calculator;
