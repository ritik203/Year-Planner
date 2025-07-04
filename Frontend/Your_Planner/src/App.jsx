import React from "react";
import YearSelector from "./components/YearSelector";
import MonthSection from "./components/MonthSection";
import AddPlanForm from "./components/AddPlanForm";
import "./App.css";
import { PlanProvider } from "./context/PlanContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <PlanProvider>
      <div className="page-layout">
        <div className="main-left">
          <h1>📅 Year Planner</h1>
          <YearSelector />
          <MonthSection />
        </div>

        <div className="main-right">
          <AddPlanForm />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </PlanProvider>
  );
};

export default App;
