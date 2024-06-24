
import PropTypes from 'prop-types';
const Notification = ({ message, isError}) => {
  if(!message){
    return null;
  }
  const notificationStyle = {
    color: 'white',
  backgroundColor: isError ? 'red' : 'green',
  padding: '15px 20px',
  marginBottom: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.2em',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Notification
