import React from 'react';
import NotificationItem from './NotificationItem';
import { Container, Row, Col } from 'react-bootstrap';

const NotificationList = ({ notifications }) => {
  return (
    <Container>
      <Row>
        {notifications.map(notification => (
          <Col key={notification.notification_id} sm={12} md={6} lg={4}>
            <NotificationItem notification={notification} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NotificationList;
