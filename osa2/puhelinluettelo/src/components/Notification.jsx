import React from 'react';

const Notification = ({ message}) => {
  if(!message){
    return null;
  }
  const notificationStyle = {
    color: 'white',
    backgroundColor: message.isError ? 'red' : 'green',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
  }

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

export default Notification
