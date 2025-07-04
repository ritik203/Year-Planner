import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";

const YearSelector = () => {
  const { selectYear, setSelectedYear } = useContext(PlanContext);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>Select Year: </label>
      <select
        value={selectYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
