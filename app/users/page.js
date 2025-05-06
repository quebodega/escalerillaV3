"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <a href="/users/create">Crear nuevo usuario</a>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <a href={`/users/${user.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}