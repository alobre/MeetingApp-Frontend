import React, { useState } from "react";
import style from "./style.css";
import NotificationTable from "components/NotificationTable";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([ 
    { id: 1, userId: 'ana', message: 'You have been invited to edit the agenda of Stardust meeting.', date: '2023-05-27', time: "12:15" },
    { id: 2, userId: 'Florian', message: 'Protocol to Shrek Corp Inventions is finished and ready to read', date: '2023-05-28', time: "17:12" },
    { id: 3, userId: 'alo', message: 'You have been invited to a meeting', date: '2023-05-29', time: "02:15" },
    { id: 4, userId: 'ana', message: 'You have been invited to a meeting "future investments" scheduled on 2023-04-23 at 12:30.', date: '2023-05-27', time: "12:15" },
  ]);
  const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification>([]);
  
    const addNotification = (userId: string, message: string, date: string, time: string) => {
      console.log("entered addNotification");
      const newNotification = {
        id: notifications.length + 1,
        userId,
        message,
        date,
        time,
      };
      setNotifications([...notifications, newNotification]);
    };    



   
  }
  
  const getNotificationsByUserId = (userId: string) => {
    console.log("loggedUser localstorage: " + localStorage.getItem("loggedUser"));
    return notifications.filter(notification => notification.userId === userId);
  };
  
  return (
    <div>
        <NotificationTable data={getNotificationsByUserId(localStorage.getItem("loggedUser"))} />
      </div>
  );
};
export default NotificationScreen;
