import React, { Component } from 'react';
import './SurveyForm.css';

const checkBoxes = [
  {
    id: 'frontEndProjects',
    value: 'frontEndProjects',
    title: 'Front-end Projects'
  },
  {
    id: 'backEndProjects',
    value: 'backEndProjects',
    title: 'Back-end Projects'
  },
  {
    id: 'dataVis',
    value: 'dataVis',
    title: 'Data Visualization'
  },
  {
    id: 'challenges',
    value: 'challenges',
    title: 'Challenges'
  },
  {
    id: 'openSource',
    value: 'openSource',
    title: 'Open Source Community'
  },
  {
    id: 'gitterHelpRoooms',
    value: 'gitterHelpRoooms',
    title: 'Gitter help rooms'
  },
  {
    id: 'videos',
    value: 'videos',
    title: 'Videos'
  },
  {
    id: 'cityMeetups',
    value: 'cityMeetups',
    title: 'City Meetups'
  },
  {
    id: 'wiki',
    value: 'wiki',
    title: 'Wiki'
  },
  {
    id: 'forum',
    value: 'forum',
    title: 'Forum'
  },
  {
    id: 'additionalCourses',
    value: 'additionalCourses',
    title: 'Additional Courses'
  }
];

const radios = [
  {
    id: 'definitely',
    value: 'definitely',
    title: 'Definitely'
  },
  {
    id: 'maybe',
    value: 'maybe',
    title: 'Maybe'
  },
  {
    id: 'notSure',
    value: 'notSure',
    title: 'Not sure'
  }
];

const CheckBox = props => {
  const { name, id, value, children, onChange, checked } = props;
  return (
    <div>
      <input
        className="sf-cb-input"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="sf-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

const RadioButton = props => {
  const { name, id, value, children, onChange, checked } = props;
  return (
    <div>
      <input
        className="sf-radio-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="sf-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', number: 1, radio: '', cb: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleCbChange = this.handleCbChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCbChange(e) {
    console.log(this.state.cb);
    const { name, value, checked } = e.target;
    this.setState(({ [name]: prev }) => {
      const nextState = { ...prev, [value]: checked };
      return { [name]: nextState };
    });
  }

  render() {
    const { name, email, number, dropdown, radio, cb } = this.state;
    console.log(cb);
    return (
      <div>
        <h1 id="title">Survey Form</h1>
        <p id="description">Let us know how we can improve freeCodeCamp</p>
        <form action="" id="survey-form">
          <div>
            <label id="name-label" htmlFor="name">
              * Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Joe Smith"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label id="email-label" htmlFor="email">
              * Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="foo@this.com"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label id="number-label" htmlFor="number">
              * Age:
            </label>
            <input
              type="number"
              id="number"
              name="number"
              required
              placeholder="25"
              value={number}
              onChange={this.handleChange}
              min={1}
              max={130}
            />
          </div>
          <div>
            <label id="dropdown-label" htmlFor="dropdown">
              Describe your current role:
            </label>
            <select
              name="dropdown"
              id="dropdown"
              placeholder="Select an option..."
              onSelect={this.handleChange}
              value={dropdown}
            >
              <option value="student">Student</option>
              <option value="full-time-job">Full Time Job</option>
              <option value="full-time-learner">Full Time Learner</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label id="radio-label">
              * How likely is that you would recommend freeCodeCamp to a friend?
            </label>
            <fieldset>
              {radios.map(r => (
                <RadioButton
                  key={r.value}
                  name="radio"
                  id={r.id}
                  value={r.value}
                  onChange={this.handleChange}
                  checked={radio === r.value}
                >
                  {r.title}
                </RadioButton>
              ))}
            </fieldset>
            <div>
              <label id="cb-label">
                {`* Things that should be improved in the future (Check all that applies)`}
              </label>
              {checkBoxes.map(cbox => (
                <CheckBox
                  key={cbox.value}
                  name="cb"
                  id={cbox.id}
                  value={cbox.value}
                  onChange={this.handleCbChange}
                  checked={cb[cbox.value] || false}
                >
                  {cbox.title}
                </CheckBox>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SurveyForm;
