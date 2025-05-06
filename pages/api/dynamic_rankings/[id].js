import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const { rows } = await pool.query("SELECT * FROM dynamic_rankings WHERE id = $1", [id]);
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error fetching dynamic ranking" });
      }
      break;
    case "PUT":
      const { league_id, participant_id, sport, ranking_metrics, current_ranking } = req.body;
      try {
        const { rows } = await pool.query(
          "UPDATE dynamic_rankings SET league_id = $1, participant_id = $2, sport = $3, ranking_metrics = $4, current_ranking = $5 WHERE id = $6 RETURNING *",
          [league_id, participant_id, sport, ranking_metrics, current_ranking, id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error updating dynamic ranking" });
      }
      break;
    case "DELETE":
      try {
        const { rows } = await pool.query(
          "DELETE FROM dynamic_rankings WHERE id = $1 RETURNING *",
          [id]
        );
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: "Error deleting dynamic ranking" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}