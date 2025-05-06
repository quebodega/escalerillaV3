import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM notifications");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching notifications" });
      }
      break;
    case "POST":
      const { user_id, type, data, read } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO notifications (user_id, type, data, read) VALUES ($1, $2, $3, $4) RETURNING *",
          [user_id, type, data, read]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating notification" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}