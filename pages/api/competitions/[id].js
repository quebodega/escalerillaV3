import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query(
          "SELECT * FROM competitions WHERE id = $1",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching competition" });
      }
      break;
    case "PUT":
      const { league_id, sport, date, participants, scoring_type } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE competitions SET league_id = $1, sport = $2, date = $3, participants = $4, scoring_type = $5 WHERE id = $6 RETURNING *",
          [league_id, sport, date, participants, scoring_type, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating competition" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM competitions WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting competition" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}