import PropTypes from 'prop-types'
import './Input.css';
function InputField({placeholder, type, onChange}) {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} className='input_field' required />
  )
}


InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func
}
export default InputField;
