import PropTypes from 'prop-types';

const DateSelectionInput = ({
  id,
  required,
}) => (
  <input
    type="date"
    id={id}
    required={required}
    className="px-6 py-2 rounded-full font-semibold min-w-[200px] bg-lime-500 text-white border-2 border-white focus:outline-none"
    style={{
      colorScheme: 'dark',
    }}
  />
);

DateSelectionInput.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

DateSelectionInput.defaultProps = {
  required: false,
};

export default DateSelectionInput;
