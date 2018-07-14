import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import routeConfig from '../routes/routeConfig';

export const ButtonLink = ({ className, bgColor, ...rest }) => {
  const cls = ['btn', className].join(' ');
  return (
    <a className={cls} style={{ background: bgColor }} {...rest}>
      {' '}
    </a>
  );
};
const navGridClass = ['nav-grid'];

const Navigation = ({ className }) => {
  navGridClass.push(className);
  const cls = navGridClass.join(' ');
  return (
    <div className={cls}>
      {routeConfig.map(route => (
        <NavLink
          key={route.path}
          className="nav-item"
          activeClassName="selected"
          to={route.path}
        >
          {route.title}
        </NavLink>
      ))}
      <ButtonLink
        className="fa fa-github fa-2x nav-item git-hub-link"
        href="https://github.com/jbockerstette/react-freecodecamp-projects"
        target="_blank"
      />
    </div>
  );
};

export default Navigation;
