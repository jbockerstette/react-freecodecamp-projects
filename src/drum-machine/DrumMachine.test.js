import React from 'react';
import { mount } from 'enzyme';
import DrumMachine from './DrumMachine';

describe('DrumMachine', () => {
  const simMockEvent = {};
  const simMockEventCbs = {};
  const callAll = cbs => args => {
    cbs.forEach(cb => cb(args));
  };
  // This will mock the addEventListener and allow me to simulate a specific event. For
  // example:
  /*
    -- CODE to test that adds an event listener.
    document.addEventListener('keypress', this.handleKeyPress);
    -- will translate to:
    simMockEvent.keypress = this.handleKeyPress
    -- so I can now simulate a keypress event as follows 
    simMockEvent.keypress({key:'q'});
    -- which will call the callback like so:
    this.handleKeyPress({key:'q'})
  */
  document.addEventListener = jest.fn().mockImplementation((event, cb) => {
    // you could have many listeners for the same event so that is why we
    // need an array of cbs for a single event.
    simMockEventCbs[event] = simMockEventCbs[event] || [];
    simMockEventCbs[event].push(cb);
    simMockEvent[event] = callAll(simMockEventCbs[event]);
  });
  const wrapper = mount(<DrumMachine />);

  it('should have Drums', () => {
    expect(wrapper.find('Drums').length).toEqual(1);
    expect(wrapper.find('#drums').length).toEqual(1);
  });
  it('should have nine DrumPads', () => {
    expect(wrapper.find('DrumPad').length).toEqual(9);
  });
  it('should set the proper title of the drum in the display', () => {
    expect(wrapper.find('Display').length).toEqual(1);
    expect(wrapper.find('Display').text()).toEqual('Click to try');
  });
  it('should set the proper title of the drum in the display on tap', () => {
    const drum = wrapper.find('#Heater-1');
    drum.simulate('click');
    expect(wrapper.find('Display').text()).toEqual('Heater-1');
  });
  it('should set the proper title of the drum in the display on keypress', () => {
    simMockEvent.keypress({ key: 'w' });
    expect(wrapper.find('Display').text()).toEqual('Heater-2');
  });
  it('should activate the proper audio on tap', () => {
    const drum = wrapper.find('#Heater-1');
    const audio = wrapper.find('audio#Q').instance();
    audio.play = jest.fn();
    expect(audio.play).not.toHaveBeenCalled();
    drum.simulate('click');
    expect(audio.play).toHaveBeenCalled();
    audio.play.mockRestore();
  });
});
