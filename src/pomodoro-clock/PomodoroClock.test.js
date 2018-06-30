import React from 'react';
import { mount } from 'enzyme';
import PomodoroClock from './PomodoroClock';

describe('PomodoroClock', () => {
  const clock = mount(<PomodoroClock />);
  it('should have a break-label that contains the string Break Length', () => {
    expect(clock.find('#break-label').length).toBe(1);
    expect(clock.find('#break-label').text()).toBe('Break Length');
  });
  it('should have a session-label that contains the string Session Length', () => {
    expect(clock.find('#session-label').length).toBe(1);
    expect(clock.find('#session-label').text()).toBe('Session Length');
  });
  it('should have two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement"', () => {
    const bd = clock.find('#break-decrement');
    const sd = clock.find('#session-decrement');
    expect(bd.length).toBe(1);
    expect(sd.length).toBe(1);
    expect(typeof bd.props().onClick).toBe('function');
    expect(typeof sd.props().onClick).toBe('function');
  });
  it('should have two clickable elements with corresponding IDs: id="break-increment" and id="session-increment"', () => {
    const bi = clock.find('#break-increment');
    const si = clock.find('#session-increment');
    expect(bi.length).toBe(1);
    expect(si.length).toBe(1);
    expect(typeof bi.props().onClick).toBe('function');
    expect(typeof si.props().onClick).toBe('function');
  });

  it('should have an element with a corresponding id="break-length", which by default (on load) displays a value of 5.', () => {
    expect(clock.find('#break-length').length).toBe(1);
    expect(clock.find('#break-length').text()).toBe('5');
  });
  it('should have an element with a corresponding id="session-length", which by default (on load) displays a value of 25.', () => {
    expect(clock.find('#session-length').length).toBe(1);
    expect(clock.find('#session-length').text()).toBe('25');
  });
  it('should have an element with a corresponding id="timer-label", that constains string indicating session is initialized eg "Session".', () => {
    expect(clock.find('#timer-label').length).toBe(1);
    expect(clock.find('#timer-label').text()).toBe('Session');
  });
  it('should have an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00)', () => {
    expect(clock.find('#time-left').length).toBe(1);
    expect(clock.find('#time-left').text()).toMatch(/\d\d:\d\d/);
  });
  it('should have a clickable element with a corresponding id="start_stop"', () => {
    const startStop = clock.find('#start_stop');
    expect(startStop.length).toBe(1);
    expect(typeof startStop.props().onClick).toBe('function');
  });
  it('should have a clickable element with a corresponding id="reset"', () => {
    const reset = clock.find('#reset');
    expect(reset.length).toBe(1);
    expect(typeof reset.props().onClick).toBe('function');
  });
  it('when id=reset is clicked, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to default state', () => {
    clock.find('#start_stop').simulate('click');
    clock.find('#reset').simulate('click');
    expect(clock.find('#break-length').text()).toBe('5');
    expect(clock.find('#session-length').text()).toBe('25');
    expect(clock.find('#time-left').text()).toBe('25:00');
  });
  it('should decrement when click element id=break-decrement, the value within id="break-length" decrements by a value of 1', () => {
    let val = Number(clock.find('#break-length').text());
    val -= 1;
    clock.find('#break-decrement').simulate('click');
    expect(clock.find('#break-length').text()).toBe(val.toString());
  });
  it('should increment when click element id=break-increment, the value within id="break-length" decrements by a value of 1', () => {
    let val = Number(clock.find('#break-length').text());
    val += 1;
    clock.find('#break-increment').simulate('click');
    expect(clock.find('#break-length').text()).toBe(val.toString());
  });
  it('should decrement when click element id=session-decrement, the value within id="session-length" decrements by a value of 1', () => {
    let val = Number(clock.find('#session-length').text());
    val -= 1;
    clock.find('#session-decrement').simulate('click');
    expect(clock.find('#session-length').text()).toBe(val.toString());
  });
  it('should increment when click element id=session-increment, the value within id="session-length" decrements by a value of 1', () => {
    let val = Number(clock.find('#session-length').text());
    val += 1;
    clock.find('#session-increment').simulate('click');
    expect(clock.find('#session-length').text()).toBe(val.toString());
  });
  it('should not be able to set a session or break length <= 0', () => {
    const brk = Number(clock.find('#break-length').text());
    const session = Number(clock.find('#session-length').text());
    const brkBtn = clock.find('#break-decrement');
    const sessBtn = clock.find('#session-decrement');
    for (let i = 0; i < brk; i += 1) {
      brkBtn.simulate('click');
    }
    for (let i = 0; i < session; i += 1) {
      sessBtn.simulate('click');
    }
    expect(clock.find('#break-length').text()).toBe('1');
    expect(clock.find('#session-length').text()).toBe('1');
  });
  it('should not be able to set a session or break length > 60', () => {
    const brkBtn = clock.find('#break-increment');
    const sessBtn = clock.find('#session-increment');
    for (let i = 0; i < 61; i += 1) {
      brkBtn.simulate('click');
    }
    for (let i = 0; i < 61; i += 1) {
      sessBtn.simulate('click');
    }
    expect(clock.find('#break-length').text()).toBe('60');
    expect(clock.find('#session-length').text()).toBe('60');
  });
  it('should start the timer at the session-length setting.', () => {
    clock.find('#reset').simulate('click');
    clock.find('#session-decrement').simulate('click');
    const session = Number(clock.find('#session-length').text());
    clock.find('#start_stop').simulate('click');
    expect(clock.find('#time-left').text()).toBe(`${session}:00`);
  });
  it('should update the time-left every 1000ms.', () => {
    jest.useFakeTimers();
    clock.find('#reset').simulate('click');
    const session = Number(clock.find('#session-length').text());
    clock.find('#start_stop').simulate('click');
    expect(clock.find('#time-left').text()).toBe(`${session}:00`);
    jest.runTimersToTime(1000);
    expect(clock.find('#time-left').text()).toBe(`${session - 1}:59`);
  });
  it('should be able to start and stop the time-left.', () => {
    jest.useFakeTimers();
    clock.find('#reset').simulate('click');
    const session = Number(clock.find('#session-length').text());
    clock.find('#start_stop').simulate('click');
    expect(clock.find('#time-left').text()).toBe(`${session}:00`);
    jest.runTimersToTime(1000);
    clock.find('#start_stop').simulate('click');
    expect(clock.find('#time-left').text()).toBe(`${session - 1}:59`);
    jest.runTimersToTime(2000);
    expect(clock.find('#time-left').text()).toBe(`${session - 1}:59`);
    clock.find('#start_stop').simulate('click');
    jest.runTimersToTime(1000);
    expect(clock.find('#time-left').text()).toBe(`${session - 1}:58`);
  });
  it('should run the session timer to 00:00 and then the break should start.', () => {
    jest.useFakeTimers();
    clock.find('#reset').simulate('click');
    const session = Number(clock.find('#session-length').text());
    const brk = Number(clock.find('#break-length').text());
    clock.find('#start_stop').simulate('click');
    jest.runTimersToTime(session * 60 * 1000);
    expect(clock.find('#time-left').text()).toBe('00:00');
    expect(clock.find('#timer-label').text()).toBe('Session');
    jest.runTimersToTime(1000);
    expect(clock.find('#timer-label').text()).toBe('Break');
    expect(clock.find('#time-left').text()).toBe(`0${brk}:00`);
    jest.runTimersToTime(brk * 60 * 1000);
    expect(clock.find('#time-left').text()).toBe('00:00');
    expect(clock.find('#timer-label').text()).toBe('Break');
    jest.runTimersToTime(1000);
    jest.runTimersToTime(session * 60 * 1000);
    expect(clock.find('#time-left').text()).toBe('00:00');
    expect(clock.find('#timer-label').text()).toBe('Session');
    jest.runTimersToTime(1000);
    expect(clock.find('#timer-label').text()).toBe('Break');
    expect(clock.find('#time-left').text()).toBe(`0${brk}:00`);
    jest.runTimersToTime(brk * 60 * 1000);
    expect(clock.find('#time-left').text()).toBe('00:00');
    expect(clock.find('#timer-label').text()).toBe('Break');
  });
  it('should beep at each zero time for session end and break end.', () => {
    jest.useFakeTimers();
    clock.find('#reset').simulate('click');
    const playMock = jest.fn();
    clock.find('#beep').instance().play = playMock;
    const session = Number(clock.find('#session-length').text());
    const brk = Number(clock.find('#session-length').text());
    clock.find('#start_stop').simulate('click');
    jest.runTimersToTime(session * 60 * 1000);
    jest.runTimersToTime(brk * 60 * 1000);
    expect(playMock).toHaveBeenCalledTimes(2);
  });
  it('should have a beep of at least 1 second.', () => {
    const beeper = clock.find('#beep').instance();
    expect(beeper.duration).toBeGreaterThanOrEqual(0);
  });
  it('should rewind the audio to beginning when reset is clicked', () => {
    const beeper = clock.find('#beep').instance();
    beeper.pause = jest.fn();
    clock
      .find('#beep')
      .instance()
      .play();
    clock.find('#reset').simulate('click');
    expect(clock.find('#beep').instance().currentTime).toBe(0);
    expect(beeper.pause).toBeCalled();
  });
});
