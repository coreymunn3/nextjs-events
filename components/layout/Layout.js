import React, { Fragment, useContext } from 'react';
import Header from './Header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notificationContext';

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
