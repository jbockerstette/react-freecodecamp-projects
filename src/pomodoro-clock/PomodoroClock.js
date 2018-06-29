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
    this.state = { sessionMinutes: 25, breakMinutes: 5 };
  }

  handleIncDec = (inc, min, max, propertyName) => () => {
    this.setState(({ [propertyName]: prev }) => {
      let next = prev + inc;
      if (next < min) {
        next = min;
      } else if (next > max) {
        next = max;
      }
      return { [propertyName]: next };
    });
  };

  render() {
    const { sessionMinutes, breakMinutes } = this.state;
    return (
      <div>
        <div>Session</div>
        <UpDownControl
          btnDownId="session-decrement"
          onClickDown={this.handleIncDec(-1, 1, 60, 'sessionMinutes')}
          btnUpId="session-increment"
          onClickUp={this.handleIncDec(1, 1, 60, 'sessionMinutes')}
          valueId="session-length"
          value={sessionMinutes}
        />
        <div>Break</div>
        <UpDownControl
          btnDownId="break-decrement"
          onClickDown={this.handleIncDec(-1, 1, 60, 'breakMinutes')}
          btnUpId="break-increment"
          onClickUp={this.handleIncDec(1, 1, 60, 'breakMinutes')}
          valueId="break-length"
          value={breakMinutes}
        />
      </div>
    );
  }
}

export default PomodoroClock;
