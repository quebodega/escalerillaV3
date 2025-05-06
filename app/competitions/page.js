"use client";

import { useEffect, useState } from "react";

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    async function fetchCompetitions() {
      const response = await fetch("/api/competitions");
      const data = await response.json();
      setCompetitions(data);
    }
    fetchCompetitions();
  }, []);

  return (
    <div>
      <h1>Competencias</h1>
      <a href="/competitions/create">Crear nueva competencia</a>
      <ul>
        {competitions.map((competition) => (
          <li key={competition.id}>
            {competition.sport} - {competition.date}
            <a href={`/competitions/${competition.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}