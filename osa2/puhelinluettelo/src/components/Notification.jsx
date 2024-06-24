
import PropTypes from 'prop-types';
const Notification = ({ message, isError}) => {
  if(!message){
    return null;
  }
  const notificationStyle = {
    color: 'white',
    backgroundColor: isError ? 'red' : 'green',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
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
