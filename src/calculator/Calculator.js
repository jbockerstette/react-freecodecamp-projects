import React from 'react';
import './Calculator.css';
import keys, { EQUALS } from './keys';

const RE_MULTIPLY_DIVIDE = /(-?[0-9.]*|Infinity|NaN)\s?([*/])\s?(-?[0-9.]*|Infinity|NaN)/i;
const RE_ADD_SUBTRACT = /(-?[0-9.]*|Infinity|NaN)\s?([+-])\s?(-?[0-9.]*|Infinity|NaN)/i;

class Calculator extends React.Component {
  static hasOperator(key) {
    return /[+\-/*]/i.test(key);
  }

  constructor(props) {
    super(props);
    this.state = { input: '', output: '0', nextKey: '' };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { input: prevInput, output: prevOutput, nextKey } = prevState;
    let nextInput = prevInput;
    let nextOutput = prevOutput;
    if (nextKey === 'ac') {
      nextInput = '';
    } else if (Calculator.hasOperator(nextKey)) {
      if (Calculator.hasOperator(prevInput.substr(-2))) {
        // replace with new operator.
        nextInput = `${prevInput.substr(0, prevInput.length - 3)} ${nextKey} `;
      } else if (prevInput.includes('=')) {
        // you have a previous result but the user wants to keep calculating using
        // that result.
        const equalsPos = prevInput.indexOf(EQUALS);
        nextInput = `${prevInput.substr(equalsPos + 2)} ${nextKey} `;
      } else {
        nextInput = `${prevInput} ${nextKey} `;
      }
    } else if (nextKey === EQUALS) {
      nextOutput = Calculator.getCalc(prevInput);
      nextInput = `${nextInput} = ${nextOutput}`;
    } else {
      nextInput = prevInput + nextKey;
    }
    return { input: nextInput, output: nextOutput };
  }

  static getCalc(expression) {
    let nextExpression = expression;
    let result = null;
    do {
      result = RE_MULTIPLY_DIVIDE.exec(nextExpression);
      if (!result) {
        result = RE_ADD_SUBTRACT.exec(nextExpression);
      }
      if (result) {
        const [match, v1, operator, v2] = result;
        let val = '';
        switch (operator) {
          case '*':
            val = `${Number(v1) * Number(v2)}`;
            break;
          case '/':
            val = `${Number(v1) / Number(v2)}`;
            break;
          case '+':
            val = `${Number(v1) + Number(v2)}`;
            break;
          case '-':
            val = `${Number(v1) - Number(v2)}`;
            break;
          default:
            break;
        }
        // Must round it.
        val = Math.round(val * 1000000) / 1000000;
        nextExpression = nextExpression.replace(match, val);
      }
    } while (result && result.every(item => item !== ''));
    return nextExpression;
  }

  handleClick(key) {
    if (Number.isInteger(Number(key))) {
      this.handleNumber(key);
    } else if (Calculator.hasOperator(key)) {
      this.handleOperator(key);
    } else if (key.toLowerCase() === 'ac') {
      this.handleClear();
    } else if (key === EQUALS) {
      this.handleEquals();
    } else if (key === '.') {
      this.handleDecimal();
    }
  }

  handleEquals() {
    const { input } = this.state;
    if (!input.includes('=')) {
      this.setState({ nextKey: EQUALS });
    }
  }

  handleClear() {
    this.setState({ output: '0', nextKey: 'ac' });
  }

  handleOperator(operator) {
    this.setState({ output: operator, nextKey: operator });
  }

  handleDecimal() {
    if (!this.state.output.includes('.')) {
      this.setState(({ input: prevInput, output: prevOutput }) => {
        let nextOutput = prevOutput;
        let nextKey = '.';
        if (prevInput.includes('=')) {
          nextOutput = '0.';
          nextKey = '0.';
        } else if (prevOutput === '0' || Calculator.hasOperator(prevOutput)) {
          nextOutput = '0.';
          nextKey = '0.';
        } else {
          nextOutput += '.';
        }
        return { output: nextOutput, nextKey };
      });
    }
  }

  handleNumber(number) {
    this.setState(({ input: prevInput, output: prevOutput }) => {
      let nextOutput = prevOutput;
      if (prevInput.includes('=')) {
        nextOutput = number;
      } else if (prevOutput === '0' || Calculator.hasOperator(prevOutput)) {
        nextOutput = number;
      } else {
        nextOutput += number;
      }
      return { output: nextOutput, nextKey: number };
    });
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
