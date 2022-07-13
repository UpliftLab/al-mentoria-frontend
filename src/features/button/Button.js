import PropTypes from 'prop-types';

const Button = ({
  child,
  onClick,
  isSubmit,
  isWhite,
}) => {
  const classesForGreen = 'bg-lime-500 text-white hover:bg-lime-600';
  const classesForWhite = 'bg-white text-lime-500 hover:bg-transparent hover:text-white hover:border-white';

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      className={`${isWhite ? classesForWhite : classesForGreen} px-6 py-2 rounded-full font-semibold min-w-[10rem] transition-colors border-2 border-transparent`}
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
