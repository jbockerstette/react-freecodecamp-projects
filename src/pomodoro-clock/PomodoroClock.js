import React from 'react';
import './PomodoroClock.css';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
  }

  handleBreakDecrement() {}

  handleBreakIncrement() {}

  handleSessionDecrement() {}

  handleSessionIncrement() {}

  render() {
    return (
      <div>
        <button onClick={this.handleBreakDecrement} id="break-decrement">
          Hi
        </button>
      </div>
    );
  }
}

export default PomodoroClock;
