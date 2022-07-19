import PropTypes from 'prop-types';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const DirectionalButton = ({
  left,
  disabled,
  onClick,
  twClasses,
}) => {
  const classesForLeft = 'rounded-r-full pl-8 pr-4';
  const classesForRight = 'rounded-l-full pr-8 pl-4';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`bg-lime-500 py-4 text-white ${left ? classesForLeft : classesForRight} disabled:bg-gray-200 hover:bg-lime-400 transition-colors ${twClasses}`}
    >
      {left ? <BiLeftArrow /> : <BiRightArrow />}
    </button>
  );
};
DirectionalButton.propTypes = {
  left: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  twClasses: PropTypes.string,
};

DirectionalButton.defaultProps = {
  left: false,
  disabled: false,
  onClick: () => { },
  twClasses: '',
};

export default DirectionalButton;
