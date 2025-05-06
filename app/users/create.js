"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    photo_url: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/users");
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Teléfono:
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          Foto URL:
          <input type="text" name="photo_url" value={form.photo_url} onChange={handleChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}