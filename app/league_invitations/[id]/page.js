"use client";

import { useEffect, useState } from "react";

export default function LeagueInvitationDetailsPage({ params }) {
  const { id } = params;
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    async function fetchInvitation() {
      const response = await fetch(`/api/league_invitations/${id}`);
      const data = await response.json();
      setInvitation(data);
    }
    fetchInvitation();
  }, [id]);

  return (
    <div>
      <h1>Detalles de la Invitación de Liga</h1>
      {invitation ? (
        <div>
          <p>Liga ID: {invitation.league_id}</p>
          <p>Invitado por (ID): {invitation.invited_by}</p>
          <p>Invitado (ID): {invitation.invitee_id}</p>
          <p>Estado: {invitation.status}</p>
          <a href={`/league_invitations/${id}/edit`}>Editar</a>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}