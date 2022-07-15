import PropTypes from 'prop-types';
import CaretDown from '../../images/caret-down.svg';

const DropDownButton = ({
  options,
  onChange,
}) => (
  <select
    onChange={onChange}
    className="px-6 py-2 rounded-full font-semibold min-w-[10rem] bg-lime-500 text-white border-2 border-white focus:outline-none appearance-none"
    style={{
      backgroundImage: `url(${CaretDown})`,
      backgroundSize: '1.2rem',
      backgroundPosition: 'right 1rem center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {options.map((value) => <option key={value} value={value}>{value}</option>)}
  </select>
);

DropDownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropDownButton;
