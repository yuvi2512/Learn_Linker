import { pool } from "../../../lib/db";

export default async function handler(req, res) {
  const { name, email, password, role_type, confirmPassword, action } = req.body;

  if (action === "register") {
    if (req.method === "POST") {
      try {
        const client = await pool.connect();
        try {
          const result = await client.query(
            "INSERT INTO public.user_details (name, email, password, role_type, confirmpassword) VALUES ($1, $2, $3, $4, $5)",
            [name, email, password, role_type, confirmPassword]
          );
          res.status(201).json({ message: "Data inserted successfully" });
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
  } else if (action === "login") {
    if (req.method === "POST") {
      try {
        const client = await pool.connect();
        try {
          const result = await client.query(
            "SELECT * FROM public.user_details WHERE email = $1 AND password = $2",
            [email, password]
          );
          if (result.rows.length > 0) {
            const userData = result.rows[0];
            res
              .status(200)
              .json({ message: "Login successful", user: userData });
          } else {
            res.status(401).json({ error: "Invalid email or password" });
          }
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
  } else {
    res.status(400).json({ error: "Invalid action" });
  }
}
