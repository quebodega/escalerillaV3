"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditLeaguePage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({
    name: "",
    sport: "",
    description: "",
    admin_id: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchLeague() {
      const response = await fetch(`/api/leagues/${id}`);
      const data = await response.json();
      setForm(data);
    }
    fetchLeague();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/leagues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/leagues");
  };

  return (
    <div>
      <h1>Editar Liga</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Deporte:
          <input type="text" name="sport" value={form.sport} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        </label>
        <label>
          ID del Administrador:
          <input type="text" name="admin_id" value={form.admin_id} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}