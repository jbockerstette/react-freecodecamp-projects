import React from 'react';
import './DrumMachine.css';
import DrumPad from './DrumPad';

const drumPads = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
const Grid = props => <div className="dm-grid">{props.children}</div>;
const Display = props => {
  const text = props.children || 'Click to tap to try';
  return (
    <div id="display" className="display">
      {text}
    </div>
  );
};
const Drums = props => (
  <div id="drums" className="drums">
    {props.children}
  </div>
);
const DrumMachineWrapper = props => (
  <div id="drum-machine" className="drum-machine">
    {props.children}
  </div>
);
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrumTap = this.handleDrumTap.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = { desc: '' };
    this.handleKeyPressCBs = [];
    this.handleKeyUpCBs = [];
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleDrumTap(desc) {
    this.setState({ desc });
  }

  handleKeyPress(e) {
    const key = e.key.toUpperCase();
    this.handleKeyPressCBs.forEach(cb => cb(key));
  }

  handleKeyUp() {
    this.handleKeyUpCBs.forEach(cb => cb());
  }

  render() {
    this.handleKeyPressCBs = [];
    this.handleKeyUpCBs = [];
    return (
      <Grid>
        <DrumMachineWrapper>
          <Drums>
            {drumPads.map(drumPad => (
              <DrumPad
                key={drumPad.id}
                title={drumPad.keyTrigger}
                desc={drumPad.id}
                audioSrc={drumPad.url}
                onClick={this.handleDrumTap}
                setKeyPressCB={cb => this.handleKeyPressCBs.push(cb)}
                setKeyUpCB={cb => this.handleKeyUpCBs.push(cb)}
              />
            ))}
          </Drums>
          <Display>{this.state.desc}</Display>
        </DrumMachineWrapper>
      </Grid>
    );
  }
}

export default DrumMachine;
