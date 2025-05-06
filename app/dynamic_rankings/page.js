"use client";

import { useEffect, useState } from "react";

export default function DynamicRankingsPage() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    async function fetchRankings() {
      const response = await fetch("/api/dynamic_rankings");
      const data = await response.json();
      setRankings(data);
    }
    fetchRankings();
  }, []);

  return (
    <div>
      <h1>Rankings Dinámicos</h1>
      <a href="/dynamic_rankings/create">Crear nuevo ranking</a>
      <ul>
        {rankings.map((ranking) => (
          <li key={ranking.id}>
            {ranking.sport} - {ranking.current_ranking}
            <a href={`/dynamic_rankings/${ranking.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}