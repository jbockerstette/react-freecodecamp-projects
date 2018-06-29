import React from 'react';
import './PomodoroClock.css';

const Button = ({ btnId, ...rest }) => <button id={btnId} {...rest} />;

const PlusButton = props => (
  <Button {...props}>
    <i className="fa fa-plus" />
  </Button>
);
const MinusButton = props => (
  <Button {...props}>
    <i className="fa fa-minus" />
  </Button>
);
const StartButton = props => (
  <Button {...props}>
    <i className="fa fa-play" />
  </Button>
);
const PauseButton = props => (
  <Button {...props}>
    <i className="fa fa-pause" />
  </Button>
);
const ResetButton = props => (
  <Button {...props}>
    <i className="fa fa-undo" />
  </Button>
);

const UpDownControl = ({
  onClickUp,
  onClickDown,
  valueId,
  btnUpId,
  btnDownId,
  value
}) => (
  <div>
    <PlusButton onClick={onClickUp} btnId={btnUpId} />
    <span id={valueId}>{value}</span>
    <MinusButton onClick={onClickDown} btnId={btnDownId} />
  </div>
);

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionMinutes: 25,
      breakMinutes: 5,
      secondsLeft: 25 * 60,
      started: false,
      sessionActive: true
    };
    this.toggleStart = this.toggleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTimerTick = this.handleTimerTick.bind(this);
  }

  static getMinutesLeft(seconds) {
    return Number.parseInt(seconds / 60, 10).toString();
  }

  static getSecondsLeft(seconds) {
    const sec = seconds % 60;
    // always return two digits.
    return `0${sec}`.slice(-2);
  }

  handleUpdateSessionMinutes = inc => () => {
    this.setState(({ sessionMinutes: prev, started }) => {
      let nextState = {};
      let next = prev;
      if (!started) {
        next = prev + inc;
        if (next < 1) {
          next = 1;
        } else if (next > 60) {
          next = 60;
        }
        nextState = { sessionMinutes: next, secondsLeft: next * 60 };
      }
      return nextState;
    });
  };

  handleUpdateBreakMinutes = inc => () => {
    this.setState(({ breakMinutes: prev, started }) => {
      let nextState = {};
      let next = prev;
      if (!started) {
        next = prev + inc;
        if (next < 1) {
          next = 1;
        } else if (next > 60) {
          next = 60;
        }
        nextState = { breakMinutes: next };
      }
      return nextState;
    });
  };

  handleTimerTick() {
    this.setState(({ secondsLeft: prevTimeLeft }) => ({
      secondsLeft: prevTimeLeft - 1
    }));
  }

  toggleStart() {
    this.setState(({ started }) => {
      if (!started) {
        this.timerId = setInterval(this.handleTimerTick, 1000);
      } else {
        clearInterval(this.timerId);
      }
      return { started: !started };
    });
  }

  handleReset() {
    clearInterval(this.timerId);
    this.setState(() => ({
      started: false,
      sessionActive: true,
      secondsLeft: 25 * 60,
      sessionMinutes: 25,
      breakMinutes: 5
    }));
  }

  render() {
    const {
      sessionMinutes,
      breakMinutes,
      secondsLeft,
      started,
      sessionActive
    } = this.state;
    const timeLeft = `${PomodoroClock.getMinutesLeft(
      secondsLeft
    )}:${PomodoroClock.getSecondsLeft(secondsLeft)}`;
    return (
      <div>
        <div id="session-label">Session Length</div>
        <UpDownControl
          btnDownId="session-decrement"
          onClickDown={this.handleUpdateSessionMinutes(-1)}
          btnUpId="session-increment"
          onClickUp={this.handleUpdateSessionMinutes(1)}
          valueId="session-length"
          value={sessionMinutes}
        />
        <div id="break-label">Break Length</div>
        <UpDownControl
          btnDownId="break-decrement"
          onClickDown={this.handleUpdateBreakMinutes(-1)}
          btnUpId="break-increment"
          onClickUp={this.handleUpdateBreakMinutes(1)}
          valueId="break-length"
          value={breakMinutes}
        />
        <div id="timer-label">{sessionActive ? 'Session' : 'Break'}</div>
        <div id="time-left">{timeLeft}</div>
        {started ? (
          <PauseButton onClick={this.toggleStart} btnId="start_stop" />
        ) : (
          <StartButton onClick={this.toggleStart} btnId="start_stop" />
        )}
        <ResetButton onClick={this.handleReset} btnId="reset" />
      </div>
    );
  }
}

export default PomodoroClock;
