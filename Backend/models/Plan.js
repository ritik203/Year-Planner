// import { db } from "../db.js";
// import { v4 as uuidv4 } from "uuid";

// export async function getPlansByYear(year) {
//   const [rows] = await db.query("SELECT * FROM plans WHERE YEAR(date) = ?", [
//     year,
//   ]);
//   return rows;
// }

// export async function createPlan({ title, description, date }) {
//   const id = uuidv4();
//   await db.query(
//     "INSERT INTO plans (id, title, description, date) VALUES (?, ?, ?, ?)",
//     [id, title, description, date]
//   );
// }

// export async function updateStatus(id, status) {
//   await db.query("UPDATE plans SET status = ? WHERE id = ?", [status, id]);
// }

// export async function deletePlan(id) {
//   await db.query("DELETE FROM plans WHERE id = ?", [id]);
// }
import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { v4 as uuidv4 } from "uuid";

export const Plan = sequelize.define("Plan", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    allowNull: false,
    defaultValue: "pending",
  },
});

// Sync table if not exists
await Plan.sync();
