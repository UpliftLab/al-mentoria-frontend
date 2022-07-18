import PropTypes from 'prop-types';
import CaretDown from '../../images/caret-down.svg';

const DropDownButton = ({
  options,
  elementID,
  defaultOption,
  required,
}) => (
  <select
    id={elementID}
    required={required}
    className="px-6 py-2 rounded-full font-semibold min-w-[200px] bg-lime-500 text-white border-2 border-white focus:outline-none appearance-none"
    style={{
      backgroundImage: `url(${CaretDown})`,
      backgroundSize: '1.2rem',
      backgroundPosition: 'right 1rem center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <option value="" disabled selected>{defaultOption}</option>
    {options.map((value) => <option key={value.id} value={value.id}>{value.text}</option>)}
  </select>
);

DropDownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  elementID: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

DropDownButton.defaultProps = {
  required: false,
};

export default DropDownButton;
