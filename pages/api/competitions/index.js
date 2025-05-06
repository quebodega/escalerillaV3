import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM competitions");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching competitions" });
      }
      break;
    case "POST":
      const { league_id, sport, date, participants, scoring_type } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO competitions (league_id, sport, date, participants, scoring_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [league_id, sport, date, participants, scoring_type]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating competition" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}