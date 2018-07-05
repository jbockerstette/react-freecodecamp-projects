import React from 'react';
import { mount } from 'enzyme';
import SurveyForm from './SurveyForm';

describe('SurveyForm', () => {
  const form = mount(<SurveyForm />);
  it('should have a title with id = "title" in H1 sized text.', () => {
    expect(form.find('#title').type()).toBe('h1');
  });
  it('should have a short explanation with id = "description" in P sized text.', () => {
    expect(form.find('#description').type()).toBe('p');
  });
  it('should have a form with id = "survey-form".', () => {
    expect(form.find('#survey-form').type()).toBe('form');
  });
  it('should be required to enter a name in a field with id = "name".', () => {
    const nameInput = form.find('form input#name');
    expect(nameInput.props().required).toBe(true);
  });
  it('should set the name value correctly when changed.', () => {
    form
      .find('form input#name')
      .simulate('change', { target: { name: 'name', value: 'my name' } });
    expect(form.find('form input#name').props().value).toBe('my name');
  });
  it('should be required to enter an email in a field with id = "email".', () => {
    const emailInput = form.find('form input#email');
    expect(emailInput.props().required).toBe(true);
  });
  it('should set the email value correctly when changed.', () => {
    form
      .find('form input#email')
      .simulate('change', { target: { name: 'email', value: 'hello' } });
    expect(form.find('form input#email').props().value).toBe('hello');
  });
  it('should show an html5 error if email is not formatted correctly.', () => {
    form
      .find('form input#email')
      .simulate('change', { target: { name: 'email', value: 'hello' } });
    expect(form.find('form input#email').props().value).toBe('hello');
    // TODO: on submit try to see if the error shows up.
  });
  it('should be required to enter an number in a field with id = "number".', () => {
    const number = form.find('form input#number');
    expect(number.props().required).toBe(true);
  });
  it('should set the number value correctly when changed.', () => {
    form
      .find('form input#number')
      .simulate('change', { target: { name: 'number', value: 55 } });
    expect(form.find('form input#number').props().value).toBe(55);
  });
  it('should show an html5 error if a non number is entered.', () => {
    form
      .find('form input#number')
      .simulate('change', { target: { name: 'number', value: 'hello' } });
    expect(form.find('form input#number').props().value).not.toBe('hello');
    // TODO: on submit try to see if the error shows up.
  });
  it('should show an html5 error if a number outside of the accepted range is entered.', () => {
    // TODO: I am not sure how to test to see if a number can be entered out of range.
    form
      .find('form input#number')
      .simulate('change', { target: { name: 'number', value: 555 } });
    expect(form.find('form input#number').props().value).not.toBe(555);
    form
      .find('form input#number')
      .simulate('change', { target: { name: 'number', value: -1 } });
    expect(form.find('form input#number').props().value).not.toBe(-1);
    // TODO: on submit try to see if the error shows up.
  });
  it('should have labels for name, email and number.', () => {
    expect(form.find('form label#name-label').length).toBe(1);
    expect(form.find('form label#email-label').length).toBe(1);
    expect(form.find('form label#number-label').length).toBe(1);
  });
  it('should have labels for name, email and number.', () => {
    expect(form.find('form input#name').props().placeholder).not.toBe(
      undefined
    );
    expect(form.find('form input#email').props().placeholder).not.toBe(
      undefined
    );
    expect(form.find('form input#number').props().placeholder).not.toBe(
      undefined
    );
  });
  it('should have a drop down with id = dropdown', () => {
    expect(form.find('form select#dropdown').length).toBe(1);
  });
  it('should have a drop down that allows the selection of an option.', () => {
    form
      .find('form select#dropdown')
      .simulate('select', { target: { name: 'dropdown', value: 'student' } });
    expect(form.find('form select#dropdown').props().value).toBe('student');
  });
  it('should have a radio that allows the selection of an option.', () => {
    expect(form.find('form input[name="radio"]').length).toBe(3);
    form
      .find('form input#maybe')
      .simulate('change', { target: { name: 'radio', value: 'maybe' } });
    expect(form.find('form input#maybe').props().value).toBe('maybe');
    expect(form.find('form input#maybe').props().checked).toBe(true);
    expect(form.find('form input#definitely').props().checked).toBe(false);
    expect(form.find('form input#notSure').props().checked).toBe(false);
  });
});

// Inside the form element, I can select several fields from a series of checkboxes, each
//    of which must have a value attribute.
// Inside the form element, I am presented with a textarea at the end for additional comments.
// Inside the form element, I am presented with a button with id = "submit" to submit all my inputs.
