"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditDynamicRankingPage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({
    league_id: "",
    participant_id: "",
    sport: "",
    ranking_metrics: "",
    current_ranking: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchRanking() {
      const response = await fetch(`/api/dynamic_rankings/${id}`);
      const data = await response.json();
      setForm(data);
    }
    fetchRanking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/dynamic_rankings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/dynamic_rankings");
  };

  return (
    <div>
      <h1>Editar Ranking Dinámico</h1>
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}