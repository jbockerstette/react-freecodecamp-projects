import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export const ButtonLink = ({ className, bgColor, ...rest }) => {
  const cls = ['btn', className].join(' ');
  return <a className={cls} style={{ background: bgColor }} {...rest} />;
};
const navGridClass = ['nav-grid'];

const Navigation = ({ className }) => {
  navGridClass.push(className);
  const cls = navGridClass.join(' ');
  return (
    <div className={cls}>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/random-quote-machine"
      >
        Random Quote Machine
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/markdown-previewer"
      >
        Markdown Previewer
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/drum-machine"
      >
        Drum Machine
      </NavLink>
      <NavLink className="nav-item" activeClassName="selected" to="/calculator">
        Calculator
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/pomodoro-clock"
      >
        Pomodoro Clock
      </NavLink>
      <ButtonLink
        className="fa fa-github nav-item"
        href="https://github.com/jbockerstette/react-freecodecamp-projects"
        target="_blank"
      />
    </div>
  );
};

export default Navigation;
