"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeaguePage() {
  const [form, setForm] = useState({
    name: "",
    sport: "",
    description: "",
    admin_id: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/leagues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/leagues");
  };

  return (
    <div>
      <h1>Crear Liga</h1>
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}