import { pool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    const { subject, end_date, description } = data;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const queryText = `
           INSERT INTO public."assignments" (subject, end_date , description)
          VALUES ($1, $2, $3)
          ON CONFLICT (subject, end_date , description) DO NOTHING
          `;

      await client.query(queryText, [
        subject,
        end_date,
        description,
      ]);

      await client.query("COMMIT");

      res.status(200).json({ message: "Data inserted successfully." });
    } catch (error) {
      await client.query("ROLLBACK");

      console.error("Error inserting data:", error);
      res
        .status(500)
        .json({ error: "Something went wrong during data insertion." });
    } finally {
      client.release();
    }
  } else if (req.method === "GET") {

       try {
      const client = await pool.connect();
      try {
        const queryText = `
          SELECT * FROM public.assignments
        `;

        const result = await client.query(queryText);

        if (result.rows.length === 0) {
          res
            .status(404)
            .json({ message: "No assignments found." });
        } else {
          res.status(200).json(result.rows);
        }
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

 else if (req.method === "DELETE") {
    const { data } = req.body;
    const { subject, date } = data;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const queryText = `
            DELETE FROM public."upcoming_tests"
            WHERE subject = $1 AND date = $2
          `;

      const result = await client.query(queryText, [subject, date]);

      if (result.rowCount === 0) {
        res.status(404).json({
          message: "No entry found for this subject and date combination.",
        });
      } else {
        await client.query("COMMIT");
        res.status(200).json({ message: "Data deleted successfully." });
      }
    } catch (error) {
      await client.query("ROLLBACK");

      console.error("Error deleting data:", error);
      res
        .status(500)
        .json({ error: "Something went wrong during data deletion." });
    } finally {
      client.release();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
