"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailsPage({ params }) {
  const { id } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      {user ? (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
          <p>Foto: <img src={user.photo_url} alt="Foto del usuario" /></p>
          <a href={`/users/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}