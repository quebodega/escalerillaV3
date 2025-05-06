import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM notifications WHERE id = $1", [id]);
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching notification" });
      }
      break;
    case "PUT":
      const { user_id, type, data, read } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE notifications SET user_id = $1, type = $2, data = $3, read = $4 WHERE id = $5 RETURNING *",
          [user_id, type, data, read, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating notification" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM notifications WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting notification" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}