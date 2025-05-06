export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><a href="/users">Usuarios</a></li>
              <li><a href="/leagues">Ligas</a></li>
              <li><a href="/teams">Equipos</a></li>
              <li><a href="/competitions">Competencias</a></li>
              <li><a href="/dynamic_rankings">Rankings</a></li>
              <li><a href="/league_invitations">Invitaciones</a></li>
              <li><a href="/notifications">Notificaciones</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}