import { useContext, useState } from "react";
import { addPlan } from "../api/plans";
import { PlanContext } from "../context/PlanContext";
import { toast } from "react-toastify";
import Joi from "joi";

const AddPlanForm = () => {
  const { selectYear, fetchPlans } = useContext(PlanContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const planSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.empty": "Title required",
      "string.min": "Title must be atleast 3 char long",
    }),
    description: Joi.string().min(5).required().messages({
      "string.empty": "Description is required",
      "string.min": "Description length should be atleast 5char long",
    }),
    date: Joi.date().required().messages({
      "any.required": "Date is required",
      "date.base": "Invalid date format",
    }),
  });
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = planSchema.validate(form, { abortEarly: false });
    if (error) {
      error.details.forEach((details) => toast.error(details.message));
      return;
    }

    try {
      await addPlan(form);
      toast.success("Plan added !!");
      setForm({ title: "", description: "", date: "" });
      fetchPlans(selectYear);
    } catch (error) {
      toast.error("Failed to add plan!!");
    }
  };

  return (
    <div>
      <h2 className="text-x1 font-semibold mb-4">Add Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date:</label>
          <br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
};

export default AddPlanForm;
