import PropTypes from 'prop-types';

const Button = ({
  child,
  onClick,
  isSubmit,
  isWhite,
}) => {
  const classesForGreen = 'bg-lime-500 text-white hover:bg-white hover:text-lime-500';
  const classesForWhite = 'bg-white text-lime-500 hover:bg-lime-500 hover:text-white';

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      className={`${isWhite ? classesForWhite : classesForGreen} px-6 py-3 rounded-full font-semibold min-w-[8rem] transition`}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  child: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  isWhite: PropTypes.string,
};

Button.defaultProps = {
  isSubmit: false,
  isWhite: false,
};

export default Button;
