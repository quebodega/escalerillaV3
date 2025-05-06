"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTeamPage() {
  const [form, setForm] = useState({
    name: "",
    league_id: "",
    captain_id: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/teams");
  };

  return (
    <div>
      <h1>Crear Equipo</h1>
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}