import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM teams");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching teams" });
      }
      break;
    case "POST":
      const { name, league_id, captain_id } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO teams (name, league_id, captain_id) VALUES ($1, $2, $3) RETURNING *",
          [name, league_id, captain_id]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating team" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}