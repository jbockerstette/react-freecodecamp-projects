import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DrumMachine.css';

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.desc);
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.play();
  }

  handleKeyPress(e) {
    if (e === this.props.title.toUpperCase()) {
      this.handleClick();
    }
  }

  render() {
    const { title, audioSrc, desc, setKeyPressCB } = this.props;
    setKeyPressCB(this.handleKeyPress);
    return (
      <button className="drum-pad" onClick={this.handleClick} id={desc}>
        {title}
        <audio className="clip" id={title} src={audioSrc} ref={this.audioRef}>
          <track kind="captions" />
        </audio>
      </button>
    );
  }
}

DrumPad.propTypes = {
  title: PropTypes.string.isRequired,
  audioSrc: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  setKeyPressCB: PropTypes.func
};

DrumPad.defaultProps = {
  onClick: () => {},
  setKeyPressCB: () => {}
};

export default DrumPad;
