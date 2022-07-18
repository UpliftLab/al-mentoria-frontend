import PropTypes from 'prop-types';
import CaretDown from '../../images/caret-down.svg';

const TopicsDropDownButton = ({
  options,
  defaultOption,
  onChange,
}) => (
  <select
    onChange={onChange}
    className="px-6 py-2 rounded-full font-semibold min-w-[200px] bg-lime-500 text-white border-2 border-white focus:outline-none appearance-none"
    style={{
      backgroundImage: `url(${CaretDown})`,
      backgroundSize: '1.2rem',
      backgroundPosition: 'right 1rem center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <option value="" disabled selected>{defaultOption}</option>
    {options.map((value) => <option key={value.id} value={value.id}>{value.topic.label}</option>)}
  </select>
);

TopicsDropDownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
};

export default TopicsDropDownButton;
