import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <NavLink to="/">Register</NavLink>
      <NavLink to="/Map">Map</NavLink>
      <NavLink to="/ContactList">ContactList</NavLink>
    </nav>
  );
}

export default Nav;
