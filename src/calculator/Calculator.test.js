import React from 'react';
import { mount } from 'enzyme';
import Calculator from './Calculator';

describe('Calculator', () => {
  const calc = mount(<Calculator />);
  beforeEach(() => {
    calc.find('#clear').simulate('click');
  });
  it('should have an equal sign with id=equals', () => {
    const equals = calc.find('#equals');
    expect(equals.length).toEqual(1);
    expect(equals.text()).toEqual('=');
  });
  it('should contain 10 clickable buttons of 0-9', () => {
    const buttons = calc.find('button');
    expect(buttons.contains('#zero')).toBe(true);
    expect(buttons.contains('#one')).toBe(true);
    expect(buttons.contains('#two')).toBe(true);
    expect(buttons.contains('#three')).toBe(true);
    expect(buttons.contains('#four')).toBe(true);
    expect(buttons.contains('#five')).toBe(true);
    expect(buttons.contains('#six')).toBe(true);
    expect(buttons.contains('#seven')).toBe(true);
    expect(buttons.contains('#eight')).toBe(true);
    expect(buttons.contains('#nine')).toBe(true);
    expect(buttons.find('#zero').text()).toEqual('0');
    expect(buttons.find('#one').text()).toEqual('1');
    expect(buttons.find('#two').text()).toEqual('2');
    expect(buttons.find('#three').text()).toEqual('3');
    expect(buttons.find('#four').text()).toEqual('4');
    expect(buttons.find('#five').text()).toEqual('5');
    expect(buttons.find('#six').text()).toEqual('6');
    expect(buttons.find('#seven').text()).toEqual('7');
    expect(buttons.find('#eight').text()).toEqual('8');
    expect(buttons.find('#nine').text()).toEqual('9');
  });
  it('should contain 4 clickable buttons of +, -, /, *', () => {
    const buttons = calc.find('button');
    expect(buttons.contains('#add')).toBe(true);
    expect(buttons.contains('#subtract')).toBe(true);
    expect(buttons.contains('#multiply')).toBe(true);
    expect(buttons.contains('#divide')).toBe(true);
    expect(buttons.find('#add').text()).toEqual('+');
    expect(buttons.find('#subtract').text()).toEqual('-');
    expect(buttons.find('#multiply').text()).toEqual('*');
    expect(buttons.find('#divide').text()).toEqual('/');
  });
  it('should contain 1 clickable buttons of .', () => {
    const buttons = calc.find('button');
    expect(buttons.contains('#decimal')).toBe(true);
    expect(buttons.find('#decimal').text()).toEqual('.');
  });
  it('should contain 1 clickable buttons of clear', () => {
    const buttons = calc.find('button');
    expect(buttons.contains('#clear')).toBe(true);
  });
  it('should contain an element to display values', () => {
    expect(calc.find('#display').length).toBe(1);
  });
  it('should clear the calculator display and set it to zero', () => {
    calc.find('#nine').simulate('click');
    expect(calc.find('#display').text()).toBe('9');
    calc.find('#clear').simulate('click');
    expect(calc.find('#display').text()).toBe('0');
  });
  it('should be able to perform a calculation 9+9-9/3*5=', () => {
    console.log(9 + 9 - (9 / 3) * 5); // = 3
    calc.find('#nine').simulate('click');
    calc.find('#add').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#minus').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#divide').simulate('click');
    calc.find('#three').simulate('click');
    calc.find('#multiply').simulate('click');
    calc.find('#five').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('3');
  });
  it('should not allow numbers to begin with multiple zeros', () => {
    calc.find('#zero').simulate('click');
    calc.find('#zero').simulate('click');
    calc.find('#zero').simulate('click');
    expect(calc.find('#display').text()).toBe('0');
  });
  it('should not allow multiple decimal points in a number', () => {
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    expect(calc.find('#display').text()).toBe('9.9');
  });
  it('should correctly add decimal numbers', () => {
    console.log(9.9 + 9.9); // = 19.8
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#add').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('19.8');
  });
  it('should correctly subtract decimal numbers', () => {
    console.log(9.9 - 9.8); // = 0.1
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#subtract').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#eight').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('0.1');
  });
  it('should correctly divide decimal numbers', () => {
    console.log(9.9 / 3.0); // = 3.3
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#divide').simulate('click');
    calc.find('#three').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#zero').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('3.3');
  });
  it('should correctly multiply decimal numbers', () => {
    console.log(9.9 * 3.0); // = 29.7
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#multiply').simulate('click');
    calc.find('#three').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#zero').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('29.7');
  });
  it('should only use the last operator if more than one are entered consecutively', () => {
    console.log(9.9 * 3.0); // = 29.7
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#add').simulate('click');
    calc.find('#divide').simulate('click');
    calc.find('#subract').simulate('click');
    calc.find('#multiply').simulate('click');
    calc.find('#three').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('29.7');
  });
  it('should use previous results for next calculation if operator is used after equals', () => {
    calc.find('#nine').simulate('click');
    calc.find('#decimal').simulate('click');
    calc.find('#nine').simulate('click');
    calc.find('#add').simulate('click');
    calc.find('#three').simulate('click');
    calc.find('#equals').simulate('click');
    calc.find('#subtract').simulate('click');
    calc.find('#one').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toBe('11.9');
  });
  it('should have at least four decimals of precision', () => {
    console.log(2 / 7); // =0.2857142857142857
    calc.find('#two').simulate('click');
    calc.find('#divide').simulate('click');
    calc.find('#seven').simulate('click');
    calc.find('#equals').simulate('click');
    expect(calc.find('#display').text()).toMatch('0.2857');
  });
});
