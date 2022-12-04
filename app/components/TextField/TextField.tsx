import PropTypes from 'prop-types';

function TextField(label: string) {
  return (
    <div>
      <label htmlFor="">
        { label }
      </label>
    </div>
  );
};

TextField.propType = {
  label: PropTypes.string.isRequired,
};

export default TextField;
