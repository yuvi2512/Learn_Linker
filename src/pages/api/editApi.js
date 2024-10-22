import { pool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, address } = req.body;
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(
          "UPDATE public.user_details SET name = $1, address = $2 WHERE email = $3",
          [name, address, email]
        );
        res.status(200).json({ message: "User details updated successfully" });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
