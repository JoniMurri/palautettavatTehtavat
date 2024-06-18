import React from 'react';

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: 'white',
    backgroundColor: isError ? 'red' : 'green',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
