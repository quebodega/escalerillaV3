"use client";

import { useEffect, useState } from "react";

export default function CompetitionDetailsPage({ params }) {
  const { id } = params;
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    async function fetchCompetition() {
      const response = await fetch(`/api/competitions/${id}`);
      const data = await response.json();
      setCompetition(data);
    }
    fetchCompetition();
  }, [id]);

  return (
    <div>
      <h1>Detalles de la Competencia</h1>
      {competition ? (
        <div>
          <p>Liga ID: {competition.league_id}</p>
          <p>Deporte: {competition.sport}</p>
          <p>Fecha: {competition.date}</p>
          <p>Participantes: {competition.participants}</p>
          <p>Tipo de puntuación: {competition.scoring_type}</p>
          <a href={`/competitions/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}