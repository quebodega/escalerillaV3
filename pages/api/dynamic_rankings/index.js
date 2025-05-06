import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM dynamic_rankings");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: "Error fetching dynamic rankings" });
      }
      break;
    case "POST":
      const { league_id, participant_id, sport, ranking_metrics, current_ranking } = req.body;
      try {
        const { rows } = await pool.query(
          "INSERT INTO dynamic_rankings (league_id, participant_id, sport, ranking_metrics, current_ranking) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [league_id, participant_id, sport, ranking_metrics, current_ranking]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error creating dynamic ranking" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}