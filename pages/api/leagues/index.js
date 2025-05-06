import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM leagues");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching leagues" });
      }
      break;
    case "POST":
      const { name, sport, description, admin_id } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO leagues (name, sport, description, admin_id) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, sport, description, admin_id]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating league" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}