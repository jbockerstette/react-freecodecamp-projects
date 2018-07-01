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
  <Button {...props} className="pc-btn">
    <i className="fa fa-play fa-2x" />
  </Button>
);
const PauseButton = props => (
  <Button {...props} className="pc-btn">
    <i className="fa fa-pause fa-2x" />
  </Button>
);
const ResetButton = props => (
  <Button {...props} className="pc-btn">
    <i className="fa fa-undo fa-2x" />
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
  <div className="pc-up-down-control">
    <PlusButton onClick={onClickUp} btnId={btnUpId} />
    <span id={valueId}>{value}</span>
    <MinusButton onClick={onClickDown} btnId={btnDownId} />
  </div>
);

class PomodoroClock extends React.Component {
  static toTwoDigits(num) {
    return `0${num}`.slice(-2);
  }

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
    this.audioRef = React.createRef();
  }

  static getMinutesLeft(seconds) {
    const num = Number.parseInt(seconds / 60, 10).toString();
    return PomodoroClock.toTwoDigits(num);
  }

  static getSecondsLeft(seconds) {
    const sec = seconds % 60;
    // always return two digits.
    return PomodoroClock.toTwoDigits(sec);
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
    this.setState(
      ({
        secondsLeft: prevTimeLeft,
        sessionActive,
        sessionMinutes,
        breakMinutes
      }) => {
        let nextSessionActive = sessionActive;
        let nextSecondsLeft = prevTimeLeft - 1;
        if (prevTimeLeft === 0) {
          this.audioRef.current.play();
          nextSessionActive = !sessionActive;
          if (nextSessionActive) {
            nextSecondsLeft = sessionMinutes * 60;
          } else {
            nextSecondsLeft = breakMinutes * 60;
          }
        }
        return {
          secondsLeft: nextSecondsLeft,
          sessionActive: nextSessionActive
        };
      }
    );
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
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
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
      <div className="pc-grid-main">
        <div className="pc-title">Pomodoro Clock</div>
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
        </div>
        <div>
          <div id="break-label">Break Length</div>
          <UpDownControl
            btnDownId="break-decrement"
            onClickDown={this.handleUpdateBreakMinutes(-1)}
            btnUpId="break-increment"
            onClickUp={this.handleUpdateBreakMinutes(1)}
            valueId="break-length"
            value={breakMinutes}
          />
        </div>
        <div className="pc-time">
          <div id="timer-label">{sessionActive ? 'Session' : 'Break'}</div>
          <div id="time-left">{timeLeft}</div>
        </div>
        {started ? (
          <PauseButton onClick={this.toggleStart} btnId="start_stop" />
        ) : (
          <StartButton onClick={this.toggleStart} btnId="start_stop" />
        )}
        <ResetButton onClick={this.handleReset} btnId="reset" />
        <audio
          src="https://goo.gl/65cBl1"
          id="beep"
          preload="auto"
          ref={this.audioRef}
        >
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

export default PomodoroClock;
