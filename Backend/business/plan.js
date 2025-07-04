import { Plan } from "../models/Plan.js";
import { sequelize } from "../models/index.js";
async function getPlansByYear(year) {
  return await Plan.findAll({
    where: sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year),
    order: [["date", "ASC"]],
  });
}

async function createPlan({ title, description, date }) {
  await Plan.create({ title, description, date });
}

async function updateStatus(id, status) {
  await Plan.update({ status }, { where: { id } });
}

async function deletePlan(id) {
  await Plan.destroy({ where: { id } });
}
export { getPlansByYear, createPlan, updateStatus, deletePlan };
