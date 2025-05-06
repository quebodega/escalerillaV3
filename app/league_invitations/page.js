"use client";

import { useEffect, useState } from "react";

export default function LeagueInvitationsPage() {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    async function fetchInvitations() {
      const response = await fetch("/api/league_invitations");
      const data = await response.json();
      setInvitations(data);
    }
    fetchInvitations();
  }, []);

  return (
    <div>
      <h1>Invitaciones de Liga</h1>
      <a href="/league_invitations/create">Crear nueva invitación</a>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            Liga ID: {invitation.league_id}, Invitado por: {invitation.invited_by}
            <a href={`/league_invitations/${invitation.id}`}>Ver detalles</a>
          </li>
        ))}
      </ul>
    </div>
  );
}