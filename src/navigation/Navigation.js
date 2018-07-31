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

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { className } = this.props;
    const { isOpen } = this.state;
    const navGridClass = ['nav-grid'];
    navGridClass.push(className);
    navGridClass.push('responsive');
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
          className="fa fa-github fa-2x nav-item"
          href="https://github.com/jbockerstette/react-freecodecamp-projects"
          target="_blank"
        />
        <a href="#" className="nav-item icon" onClick={this.toggleMenu}>
          <i className="fa fa-bars fa-2x" />
        </a>
      </div>
    );
  }
}

export default Navigation;
