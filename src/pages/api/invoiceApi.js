import { pool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      vendor_name,
      inv_no,
      invoice_date,
      inv_lines,
    } = req.body;


    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO public."Invoice_header" (vendor_name, inv_no, invoice_date) VALUES ($1, $2, $3)`,
        [vendor_name, inv_no, invoice_date]
      );

      for (const line of inv_lines) {
        await client.query(
          `INSERT INTO public."Invoice_lines" (item, price, quantity, amount, inv_no,line_no) VALUES ($1, $2, $3, $4, $5,$6)`,
          [line.item, line.price, line.quantity, line.amount, inv_no, line.line_no]
        );
      }

      await client.query("COMMIT");

      res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      client.release();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
