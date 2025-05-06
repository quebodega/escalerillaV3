import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
          id,
        ]);
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
      }
      break;
    case "PUT":
      const { name, email, phone, photo_url } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE users SET name = $1, email = $2, phone = $3, photo_url = $4 WHERE id = $5 RETURNING *",
          [name, email, phone, photo_url, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating user" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM users WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}