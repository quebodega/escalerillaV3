import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM league_invitations");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching league invitations" });
      }
      break;
    case "POST":
      const { league_id, invited_by, invitee_id, status } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO league_invitations (league_id, invited_by, invitee_id, status) VALUES ($1, $2, $3, $4) RETURNING *",
          [league_id, invited_by, invitee_id, status]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating league invitation" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}