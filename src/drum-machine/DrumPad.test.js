import React from 'react';
import { mount } from 'enzyme';
import DrumPad from './DrumPad';

describe('DrumPad', () => {
  const wrapper = mount(
    <DrumPad title="Q" audioSrc="audioSrc" desc="hi-hat" onClick={jest.fn()} />
  );
  it('should have a button', () => {
    const btn = wrapper.find('button');
    expect(btn.length).toEqual(1);
    expect(btn.text()).toEqual('Q');
  });
  it('should have an audio element', () => {
    const audio = wrapper.find('audio');
    expect(audio.length).toEqual(1);
    expect(audio.props().src).toEqual('audioSrc');
  });

  it('should have called onClick when button is clicked', () => {
    wrapper.simulate('click');
    expect(wrapper.props().onClick).toHaveBeenCalledWith('hi-hat');
  });
  it('should call play on the audio element on click', () => {
    const audio = wrapper.find('audio').instance();
    audio.play = jest.fn();
    wrapper.simulate('click');
    expect(audio.play).toHaveBeenCalled();
  });
  it('should call on click for keypress', () => {
    wrapper.props().onClick.mockReset();
    wrapper.instance().handleKeyPress({ key: 'Q' });
    expect(wrapper.props().onClick).toHaveBeenCalled();
  });
  it('should not call on click for W keypress', () => {
    wrapper.props().onClick.mockReset();
    wrapper.instance().handleKeyPress({ key: 'W' });
    expect(wrapper.props().onClick).not.toHaveBeenCalled();
  });
  it('should have the proper state and button class on keypresses', () => {
    wrapper.instance().handleKeyUp();
    expect(wrapper.state().buttonActive).toEqual(false);
    wrapper.instance().handleKeyPress({ key: 'Q' });
    expect(wrapper.state().buttonActive).toEqual(true);
    const b = wrapper.find('button').instance();
    expect(b.className).toEqual('drum-pad button-active');
    wrapper.instance().handleKeyUp();
    expect(b.className).toEqual('drum-pad');
  });
});
