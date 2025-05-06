"use client";

import { useEffect, useState } from "react";

export default function NotificationDetailsPage({ params }) {
  const { id } = params;
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchNotification() {
      const response = await fetch(`/api/notifications/${id}`);
      const data = await response.json();
      setNotification(data);
    }
    fetchNotification();
  }, [id]);

  return (
    <div>
      <h1>Detalles de la Notificación</h1>
      {notification ? (
        <div>
          <p>Usuario ID: {notification.user_id}</p>
          <p>Tipo: {notification.type}</p>
          <p>Datos: {notification.data}</p>
          <p>Leída: {notification.read ? "Sí" : "No"}</p>
          <a href={`/notifications/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}