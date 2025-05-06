"use client";

import { useEffect, useState } from "react";

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    async function fetchLeagues() {
      const response = await fetch("/api/leagues");
      const data = await response.json();
      setLeagues(data);
    }
    fetchLeagues();
  }, []);

  return (
    <div>
      <h1>Ligas</h1>
      <a href="/leagues/create">Crear nueva liga</a>
      <ul>
        {leagues.map((league) => (
          <li key={league.id}>
            {league.name} - {league.sport}
            <a href={`/leagues/${league.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}