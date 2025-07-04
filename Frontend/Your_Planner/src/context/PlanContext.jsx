import React, { createContext, useState, useEffect } from "react";
import {
  getPlans,
  deletePlan,
  updatePlanStatus as updatePlanStatusAPI,
} from "../api/plans";
import { toast } from "react-toastify";

export const PlanContext = createContext(null);

export const PlanProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [selectYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(null); 
  const [plans, setPlans] = useState([]);

  const fetchPlans = async (year) => {
    try {
      const data = await getPlans(year);
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Error fetching plans");
    }
  };

  useEffect(() => {
    fetchPlans(selectYear);
  }, [selectYear]);

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await updatePlanStatusAPI(id, newStatus);
      fetchPlans(selectYear);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlan(id);
      toast.success("Plan deleted");
      fetchPlans(selectYear);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        selectYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        plans,
        fetchPlans,
        handleUpdateStatus,
        handleDelete,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
