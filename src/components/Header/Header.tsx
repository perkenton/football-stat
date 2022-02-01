import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';


function Header() {

  return (
    <header className={ styles.header }>
      <nav className={ styles.menu }>
        <ul className={ styles.menuList }>

          <li className={ styles.menuListItem }>
            <NavLink to='/' className={ ({ isActive }) => cn(styles.menuListLink, isActive && styles.menuListLinkActive) } >Главная</NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;