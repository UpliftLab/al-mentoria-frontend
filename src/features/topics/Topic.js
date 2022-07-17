import PropTypes from 'prop-types';

const Topic = ({ label, icon }) => (

  <div className="flex items-center justify-start bg-gray-100 rounded shadow-sm hover:bg-opacity-90 hover:backdrop-blur-xl py-2 px-4 w-fit gap-2">
    <div className="w-12">
      <img src={icon} alt={`${label}'icon`} />
    </div>
    <h3 className="">{label}</h3>
  </div>

);

Topic.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
};

Topic.defaultProps = {
  label: 'my topic',
  icon: '',
};

export default Topic;
