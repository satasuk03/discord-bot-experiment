import { Connection, createConnection, getConnection } from "typeorm";

export async function connectDB() {
  let connection: Connection;
  try {
    connection = getConnection();
  } catch (e) {
    connection = await createConnection();
  }

  if (connection) {
    console.log("Database connected");
  }

  return connection;
}
