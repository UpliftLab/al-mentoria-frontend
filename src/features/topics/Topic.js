import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiFillCloseCircle } from 'react-icons/ai';
import Image from '../../images/image-not-found.png';

const Topic = ({ label, icon, onClick }) => {
  const handleError = (e) => {
    const image = e.currentTarget;
    image.src = Image;
    image.className += ' h-8';
    toast.error('icon not found');
  };

  return (
    <button type="button" onClick={onClick} className="group relative flex cursor-pointer items-center justify-start bg-gray-100 rounded shadow-sm hover:bg-opacity-90 hover:backdrop-blur-xl py-2 px-4 w-fit gap-2">
      <div className="w-12 flex justify-center">
        <img src={icon} className="max-h-[32px]" alt={`${label}'icon`} onError={handleError} />
      </div>
      <h3>{label}</h3>
      <div className="absolute right-[1px] top-[1px] content-none text-gray-100 group-hover:text-red-500">
        <AiFillCloseCircle />
      </div>
    </button>
  );
};

Topic.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

Topic.defaultProps = {
  label: 'my topic',
  icon: '',
  onClick: () => {},
};

export default Topic;
