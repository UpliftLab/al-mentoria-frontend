import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Image from '../../images/image-not-found.png';

const Topic = ({ label, icon }) => {
  const handleError = (e) => {
    const image = e.currentTarget;
    image.src = Image;
    image.className += 'w-8';
    toast.error('icon not found');
  };

  return (

    <div className="flex items-center justify-start bg-gray-100 rounded shadow-sm hover:bg-opacity-90 hover:backdrop-blur-xl py-2 px-4 w-fit gap-2">
      <div className="w-12">
        <img src={icon} alt={`${label}'icon`} onError={handleError} />
      </div>
      <h3 className="">{label}</h3>
    </div>

  );
};

Topic.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
};

Topic.defaultProps = {
  label: 'my topic',
  icon: '',
};

export default Topic;
