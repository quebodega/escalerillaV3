"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditNotificationPage({ params }) {
  const { id } = params;
  const [form, setForm] = useState({
    user_id: "",
    type: "",
    data: "",
    read: false,
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchNotification() {
      const response = await fetch(`/api/notifications/${id}`);
      const data = await response.json();
      setForm(data);
    }
    fetchNotification();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/notifications");
  };

  return (
    <div>
      <h1>Editar Notificación</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario ID:
          <input type="text" name="user_id" value={form.user_id} onChange={handleChange} />
        </label>
        <label>
          Tipo:
          <input type="text" name="type" value={form.type} onChange={handleChange} />
        </label>
        <label>
          Datos:
          <textarea name="data" value={form.data} onChange={handleChange}></textarea>
        </label>
        <label>
          Leída:
          <input
            type="checkbox"
            name="read"
            checked={form.read}
            onChange={(e) => setForm({ ...form, read: e.target.checked })}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}