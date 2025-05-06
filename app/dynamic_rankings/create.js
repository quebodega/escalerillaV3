"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateDynamicRankingPage() {
  const [form, setForm] = useState({
    league_id: "",
    participant_id: "",
    sport: "",
    ranking_metrics: "",
    current_ranking: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/dynamic_rankings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/dynamic_rankings");
  };

  return (
    <div>
      <h1>Crear Ranking Dinámico</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Liga ID:
          <input type="text" name="league_id" value={form.league_id} onChange={handleChange} />
        </label>
        <label>
          Participante ID:
          <input type="text" name="participant_id" value={form.participant_id} onChange={handleChange} />
        </label>
        <label>
          Deporte:
          <input type="text" name="sport" value={form.sport} onChange={handleChange} />
        </label>
        <label>
          Métricas de Ranking:
          <textarea name="ranking_metrics" value={form.ranking_metrics} onChange={handleChange}></textarea>
        </label>
        <label>
          Ranking Actual:
          <input type="text" name="current_ranking" value={form.current_ranking} onChange={handleChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}