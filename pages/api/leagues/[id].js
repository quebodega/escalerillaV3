import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query(
          "SELECT * FROM leagues WHERE id = $1",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching league" });
      }
      break;
    case "PUT":
      const { name, sport, description, admin_id } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE leagues SET name = $1, sport = $2, description = $3, admin_id = $4 WHERE id = $5 RETURNING *",
          [name, sport, description, admin_id, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating league" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM leagues WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting league" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}