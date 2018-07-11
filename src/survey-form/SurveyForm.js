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
    this.state = {
      name: '',
      email: '',
      number: '',
      radio: '',
      cb: {},
      textarea: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCbChange = this.handleCbChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCbChange(e) {
    const { name, value } = e.target;
    this.setState(({ [name]: prev }) => {
      const nextState = { ...prev, [value]: !prev[value] };
      return { [name]: nextState };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { name, email, number, dropdown, radio, cb, textarea } = this.state;
    return (
      <div className="survey-grid">
        <h1 id="title">Survey Form</h1>
        <p id="description">Let us know how we can improve freeCodeCamp</p>
        <form onSubmit={this.handleSubmit} id="survey-form">
          <div className="survey-row">
            <label className="labels" id="name-label" htmlFor="name">
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
          <div className="survey-row">
            <label className="labels" id="email-label" htmlFor="email">
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
          <div className="survey-row">
            <label className="labels" id="number-label" htmlFor="number">
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
          <div className="survey-row">
            <label className="labels" id="dropdown-label" htmlFor="dropdown">
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
          <div className="survey-row">
            <label className="labels" id="radio-label">
              * How likely are you to recommend freeCodeCamp to a friend?
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
          </div>
          <div className="survey-row">
            <label className="labels" id="cb-label">
              {`* Things that should be improved in the future (Check all that applies)`}
            </label>
            <fieldset>
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
            </fieldset>
          </div>
          <div className="survey-row">
            <label className="labels" id="label-textarea" htmlFor="textarea">
              Addtional comments:
            </label>
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="10"
              value={textarea}
              placeholder="Enter any comments or suggestions..."
              onChange={this.handleChange}
            />
          </div>
          <button id="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SurveyForm;
