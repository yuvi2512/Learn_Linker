import { pool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, department } = req.body;
    console.log("data", req.body);
    try {
      const client = await pool.connect();
      try {
        const checkExistingEmail = await client.query(
          'SELECT * FROM public."department" WHERE email = $1',
          [email]
        );

        if (checkExistingEmail.rows.length > 0) {
          const updateDepartment = await client.query(
            'UPDATE public."department" SET department = department || $2 WHERE email = $1',
            [email, [department]]
          );
          res.status(200).json({ message: "Department Added successfully" });
        } else {
          const insertDepartment = await client.query(
            'INSERT INTO public."department" (email, department) VALUES ($1, $2)',
            [email, [department]]
          );
          res.status(200).json({ message: "Department Added successfully" });
        }
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else if (req.method === "GET") {
    const { email } = req.query;
    try {
      const client = await pool.connect();
      try {
        const getDepartmentQuery = await client.query(
          'SELECT department FROM public."department" WHERE email = $1',
          [email]
        );

        const departmentResult = getDepartmentQuery.rows[0]?.department;

        res.status(200).json({ department: departmentResult });
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
