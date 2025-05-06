"use client";

import { useEffect, useState } from "react";

export default function DynamicRankingDetailsPage({ params }) {
  const { id } = params;
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    async function fetchRanking() {
      const response = await fetch(`/api/dynamic_rankings/${id}`);
      const data = await response.json();
      setRanking(data);
    }
    fetchRanking();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Ranking Dinámico</h1>
      {ranking ? (
        <div>
          <p>Liga ID: {ranking.league_id}</p>
          <p>Participante ID: {ranking.participant_id}</p>
          <p>Deporte: {ranking.sport}</p>
          <p>Métricas de Ranking: {ranking.ranking_metrics}</p>
          <p>Ranking Actual: {ranking.current_ranking}</p>
          <a href={`/dynamic_rankings/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}