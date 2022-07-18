import PropTypes from 'prop-types';

const DateSelectionInput = ({
  id,
}) => (
  <input
    type="date"
    id={id}
    className="px-6 py-2 rounded-full font-semibold min-w-[200px] bg-lime-500 text-white border-2 border-white focus:outline-none"
    style={{
      colorScheme: 'dark',
    }}
  />
);

DateSelectionInput.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DateSelectionInput;
