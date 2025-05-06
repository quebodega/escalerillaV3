"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeagueInvitationPage() {
  const [form, setForm] = useState({
    league_id: "",
    invited_by: "",
    invitee_id: "",
    status: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/league_invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/league_invitations");
  };

  return (
    <div>
      <h1>Crear Invitación de Liga</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Liga ID:
          <input type="text" name="league_id" value={form.league_id} onChange={handleChange} />
        </label>
        <label>
          Invitado por (ID):
          <input type="text" name="invited_by" value={form.invited_by} onChange={handleChange} />
        </label>
        <label>
          Invitado (ID):
          <input type="text" name="invitee_id" value={form.invitee_id} onChange={handleChange} />
        </label>
        <label>
          Estado:
          <input type="text" name="status" value={form.status} onChange={handleChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}