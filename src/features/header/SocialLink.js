import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SocialLink = ({
  to,
  icon,
}) => (
  <Link
    to={to}
    className="inline-block p-1 hover:text-lime-600"
  >
    {icon}
  </Link>
);

SocialLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SocialLink;
