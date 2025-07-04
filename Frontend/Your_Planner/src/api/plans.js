import { apiFetch } from "./apiFetch";

const BASE_URL = "http://localhost:5000/plans";

export async function getPlans(year) {
  return apiFetch(`${BASE_URL}?year=${year}`);
}

export async function addPlan(plan) {
  return apiFetch(BASE_URL, "POST", plan);
}

export async function updatePlanStatus(id, status) {
  return apiFetch(`${BASE_URL}/${id}/complete`, "PUT", { status });
}

export async function deletePlan(id) {
  return apiFetch(`${BASE_URL}/${id}`, "DELETE", {});
}
