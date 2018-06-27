import React from 'react';
import './Calculator.css';
import keys, { EQUALS } from './keys';

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
  /*
  1 + 1 * 2 * 3 ['1', '+', '1', '*', '2', '*', '3']
                ['1', '+', '2' '*', '3']

  */
  static getCaclReduce(parts, operator) {
    const numberStack = [];
    const operationStack = [];
    parts.forEach(part => {
      let val = null;
      const isNumber = !Number.isNaN(Number.parseFloat(part));
      if (isNumber) {
        numberStack.push(Number(part));
      } else {
        operationStack.push(part.trim());
      }
      if (
        isNumber &&
        operationStack.length &&
        operator.includes([operationStack.slice(-1)])
      ) {
        const v2 = numberStack.pop();
        const v1 = numberStack.pop();
        const operation = operationStack.pop();
        switch (operation) {
          case '*':
            val = v1 * v2;
            break;
          case '/':
            val = v1 / v2;
            break;
          case '+':
            val = v1 + v2;
            break;
          case '-':
            val = v1 - v2;
            break;
          default:
            break;
        }
        numberStack.push(val);
      }
    });
    console.log(numberStack, operationStack);
    const temp = numberStack.map(num => {
      const op = operationStack.shift();
      return `${num}${op ? ` ${op}` : ''}`;
    });
    const aaa = temp.join(' ').trim();
    return aaa;
  }

  static getCalc(expression) {
    let nextExpression = expression;
    let parts = nextExpression.trim().split(' ');
    nextExpression = Calculator.getCaclReduce(parts, '*/');
    parts = nextExpression.trim().split(' ');
    nextExpression = Calculator.getCaclReduce(parts, '+-');
    const val = Math.round(Number(nextExpression) * 1000000000) / 1000000000;
    return val.toString();
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
    let nextNumber = number;
    this.setState(({ input: prevInput, output: prevOutput }) => {
      let nextOutput = prevOutput;
      if (prevInput.includes('=')) {
        nextOutput = nextNumber;
      } else if (prevOutput === '0' || Calculator.hasOperator(prevOutput)) {
        nextOutput = nextNumber;
      } else if (nextOutput.length < 23) {
        nextOutput += nextNumber;
      } else {
        nextNumber = '';
      }
      return { output: nextOutput, nextKey: nextNumber };
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
