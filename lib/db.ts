import mysql from "mysql2/promise"

const dbConfig = {
  host: "localhost",
  user: "sam",
  password: "sam",
  database: "db_nfc_booking",
}

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

export async function query(sql: string, params?: any[]) {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results
  } finally {
    await connection.end()
  }
}
