import PropTypes from 'prop-types';

const Topic = ({ text }) => (
  <div>{text}</div>
);

Topic.propTypes = {
  text: PropTypes.string,
};

Topic.defaultProps = {
  text: 'my type',
};

export default Topic;
