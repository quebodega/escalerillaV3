"use client";

import { useEffect, useState } from "react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const response = await fetch("/api/teams");
      const data = await response.json();
      setTeams(data);
    }
    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Equipos</h1>
      <a href="/teams/create">Crear nuevo equipo</a>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} (Liga ID: {team.league_id})
            <a href={`/teams/${team.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}