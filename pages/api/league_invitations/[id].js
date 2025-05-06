import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM league_invitations WHERE id = $1", [id]);
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching league invitation" });
      }
      break;
    case "PUT":
      const { league_id, invited_by, invitee_id, status } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE league_invitations SET league_id = $1, invited_by = $2, invitee_id = $3, status = $4 WHERE id = $5 RETURNING *",
          [league_id, invited_by, invitee_id, status, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating league invitation" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM league_invitations WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting league invitation" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}