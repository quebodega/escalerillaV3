"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    }
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notificaciones</h1>
      <a href="/notifications/create">Crear nueva notificación</a>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            Usuario ID: {notification.user_id}, Tipo: {notification.type}
            <a href={`/notifications/${notification.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}