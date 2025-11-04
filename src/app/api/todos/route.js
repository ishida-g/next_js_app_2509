// src/src/app/api/todos/route.js
import mysql from "mysql2/promise";

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await connection.execute("SELECT * FROM todos ORDER BY id DESC");
  await connection.end();

  return new Response(JSON.stringify(rows), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const { title } = await req.json();
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await connection.execute("INSERT INTO todos (title) VALUES (?)", [title]);
  await connection.end();

  return new Response(JSON.stringify({ message: "OK" }), { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await connection.execute("DELETE FROM todos WHERE id = ?", [id]);
  await connection.end();

  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
