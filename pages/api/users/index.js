import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
      }
      break;
    case "POST":
      const { name, email, phone, photo_url } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO users (name, email, phone, photo_url) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, phone, photo_url]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating user" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}