import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM teams WHERE id = $1", [
          id,
        ]);
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching team" });
      }
      break;
    case "PUT":
      const { name, league_id, captain_id } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE teams SET name = $1, league_id = $2, captain_id = $3 WHERE id = $4 RETURNING *",
          [name, league_id, captain_id, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating team" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM teams WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting team" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}