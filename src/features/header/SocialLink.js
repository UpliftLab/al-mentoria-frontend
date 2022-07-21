import PropTypes from 'prop-types';

const SocialLink = ({
  to,
  icon,
}) => (
  <a
    href={to}
    className="inline-block p-1 hover:text-lime-600"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

SocialLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SocialLink;
