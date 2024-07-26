import React from 'react';
import { Card } from 'react-bootstrap';

const NotificationItem = ({ notification }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>
          {notification.message}<br/>
          Method: {notification.method}<br/>
          Recipient: {notification.recipient}<br/>
          Timestamp: {new Date(notification.timestamp).toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NotificationItem;
