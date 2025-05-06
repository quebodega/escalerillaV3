"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCompetitionPage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({
    league_id: "",
    sport: "",
    date: "",
    participants: "",
    scoring_type: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchCompetition() {
      const response = await fetch(`/api/competitions/${id}`);
      const data = await response.json();
      setForm(data);
    }
    fetchCompetition();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/competitions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/competitions");
  };

  return (
    <div>
      <h1>Editar Competencia</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Liga ID:
          <input type="text" name="league_id" value={form.league_id} onChange={handleChange} />
        </label>
        <label>
          Deporte:
          <input type="text" name="sport" value={form.sport} onChange={handleChange} />
        </label>
        <label>
          Fecha:
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>
        <label>
          Participantes:
          <input type="text" name="participants" value={form.participants} onChange={handleChange} />
        </label>
        <label>
          Tipo de puntuación:
          <input type="text" name="scoring_type" value={form.scoring_type} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}