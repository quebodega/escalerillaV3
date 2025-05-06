"use client";

import { useEffect, useState } from "react";

export default function TeamDetailsPage({ params }) {
  const { id } = params;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      const response = await fetch(`/api/teams/${id}`);
      const data = await response.json();
      setTeam(data);
    }
    fetchTeam();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Equipo</h1>
      {team ? (
        <div>
          <p>Nombre: {team.name}</p>
          <p>Liga ID: {team.league_id}</p>
          <p>Capitán ID: {team.captain_id}</p>
          <a href={`/teams/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}