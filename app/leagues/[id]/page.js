"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LeagueDetailsPage({ params }) {
  const { id } = params;
  const [league, setLeague] = useState(null);

  useEffect(() => {
    async function fetchLeague() {
      const response = await fetch(`/api/leagues/${id}`);
      const data = await response.json();
      setLeague(data);
    }
    fetchLeague();
  }, [id]);

  return (
    <div>
      <h1>Detalles de la Liga</h1>
      {league ? (
        <div>
          <p>Nombre: {league.name}</p>
          <p>Deporte: {league.sport}</p>
          <p>Descripción: {league.description}</p>
          <p>Administrador ID: {league.admin_id}</p>
          <a href={`/leagues/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}