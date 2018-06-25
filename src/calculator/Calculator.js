import React from 'react';
import './Calculator.css';
import keys from './keys';

class Calculator extends React.Component {
  static isOperator(key) {
    return /[+-/*]/i.test(key);
  }

  constructor(props) {
    super(props);
    this.state = { input: '', output: '0' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    if (Number.isInteger(Number(key)) || key === '.') {
      this.handleNumber(key);
    } else if (Calculator.isOperator(key)) {
      this.handleOperator(key);
    } else if (key.toLowerCase() === 'ac') {
      this.handleClear();
    } else if (key === '=') {
      this.handleEquals();
    }
  }

  handleEquals() {
    // TODO: finish equals.
  }

  handleClear() {
    this.setState({ input: '', output: '0' });
  }

  handleOperator(operator) {
    this.setState(prevState => {
      let { input: nextInput } = prevState;
      if (nextInput.length > 0 && Calculator.isOperator(nextInput.substr(-1))) {
        nextInput = nextInput.substr(0, nextInput.length - 1);
      }
      nextInput += operator;
      return { output: operator, input: nextInput };
    });
  }

  handleNumber(number) {
    if (number !== '.' || !this.state.output.includes('.')) {
      this.setState(prevState => {
        const { input, output } = prevState;
        let nextOutput = output;
        if (output === '0' || Calculator.isOperator(output)) {
          nextOutput = '';
        }
        nextOutput += number;
        return { output: nextOutput, input: input + number };
      });
    }
  }

  render() {
    const { output, input } = this.state;
    return (
      <div className="calc-grid-main">
        <div className="calc-grid">
          <div id="calc-window">
            <div id="input">{input}</div>
            <div id="display">{output}</div>
          </div>
          {keys.map(key => (
            <button
              className="calc-btn"
              key={key.id}
              id={key.id}
              onClick={() => this.handleClick(key.text)}
            >
              {key.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
