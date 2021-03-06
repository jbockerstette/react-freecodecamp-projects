import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DrumMachine.css';

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = { buttonActive: false };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleClick() {
    this.props.onClick(this.props.desc);
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.play();
  }

  handleKeyPress(e) {
    const key = e.key.toUpperCase();
    if (key === this.props.title.toUpperCase()) {
      this.handleClick();
      this.setState({ buttonActive: true });
    }
  }

  handleKeyUp() {
    this.setState({ buttonActive: false });
  }

  render() {
    const { title, audioSrc, desc } = this.props;
    const btnClass = ['drum-pad'];
    if (this.state.buttonActive) {
      btnClass.push('button-active');
    }
    return (
      <button
        className={btnClass.join(' ')}
        onClick={this.handleClick}
        id={desc}
      >
        <strong>{title}</strong>
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
  onClick: PropTypes.func
};

DrumPad.defaultProps = {
  onClick: () => {}
};

export default DrumPad;
