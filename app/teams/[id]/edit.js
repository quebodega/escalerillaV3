"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTeamPage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({
    name: "",
    league_id: "",
    captain_id: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchTeam() {
      const response = await fetch(`/api/teams/${id}`);
      const data = await response.json();
      setForm(data);
    }
    fetchTeam();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/teams/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/teams");
  };

  return (
    <div>
      <h1>Editar Equipo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Liga ID:
          <input type="text" name="league_id" value={form.league_id} onChange={handleChange} />
        </label>
        <label>
          Capitán ID:
          <input type="text" name="captain_id" value={form.captain_id} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}