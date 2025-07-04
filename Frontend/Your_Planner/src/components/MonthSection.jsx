import { useContext } from "react";
import PlanCard from "./PlanCard";
import { PlanContext } from "../context/PlanContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const groupByMonth = (plans) => {
  const grouped = Array.from({ length: 12 }, () => []);

  plans.forEach((plan) => {
    const date = new Date(plan.date);
    if (!isNaN(date)) {
      const month = date.getMonth(); // 0 to 11
      grouped[month].push(plan);
    } else {
      console.warn("Invalid date found in plan:", plan);
    }
  });

  return grouped;
};

const MonthSection = () => {
  const { plans } = useContext(PlanContext);
  const groupedPlans = groupByMonth(plans);

  return (
    <div className="p-4">
      {groupedPlans.map((plansInMonth, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
            <span>{months[index]}</span>
            <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
              {plansInMonth.length}
            </span>
          </h3>
          <div className="flex flex-col gap-4">
            {plansInMonth.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthSection;
