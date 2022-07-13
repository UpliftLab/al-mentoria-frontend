import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavbarLink = ({
  title,
  to,
}) => (
  <NavLink
    to={to}
    end
    className="block py-3 px-4 text-lg font-bold uppercase hover:text-lime-600"
  >
    {title}
  </NavLink>
);

NavbarLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavbarLink;
