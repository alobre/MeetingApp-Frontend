import NotificationTable from "components/NotificationTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "components/AxiosInterceptor/AxiosInterceptor";

const NotificationScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") !== null;
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      navigate("/Login");
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const notifications = await getNotifications();
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div>
      <NotificationTable data={notifications} />
    </div>
  );
};

export default NotificationScreen;
