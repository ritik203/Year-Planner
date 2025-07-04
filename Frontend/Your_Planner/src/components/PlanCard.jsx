import React, { useContext } from "react";
import { format, parseISO, isBefore } from "date-fns";
import { PlanContext } from "../context/PlanContext";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";

const PlanCard = ({ plan }) => {
  const { handleUpdateStatus, handleDelete } = useContext(PlanContext);

  const deadline = parseISO(plan.date);
  const now = new Date();

  let computedStatus = plan.status;
  if (plan.status === "pending" && isBefore(deadline, now)) {
    computedStatus = "failed";
  }

  const handleStatusToggle = () => {
    if (computedStatus === "failed") return;
    handleUpdateStatus(plan.id, plan.status);
  };

  const handleDeleteClick = () => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) handleDelete(plan.id);
  };

  const assignedDate = format(deadline, "dd MMM yyyy");
  const completionDate =
    plan.status === "completed" && plan.updatedAt
      ? format(new Date(plan.updatedAt), "dd MMM yyyy")
      : null;

  return (
    <div className="plan-card">
      <div className="card-header">
        <strong>{plan.title}</strong>
        <div className="actions">
          <button
            onClick={handleStatusToggle}
            disabled={computedStatus === "failed"}
            title={
              computedStatus === "completed"
                ? "Mark as pending"
                : computedStatus === "pending"
                ? "Mark as completed"
                : "Task failed"
            }
          >
            {computedStatus === "completed" && (
              <FaCheckCircle color="green" size={18} />
            )}
            {computedStatus === "pending" && (
              <FaHourglassHalf color="#555" size={18} />
            )}
            {computedStatus === "failed" && (
              <FaTimesCircle color="red" size={18} />
            )}
          </button>

          <button onClick={handleDeleteClick}>
            <FaTrashAlt color="darkred" />
          </button>
        </div>
      </div>

      <p>{plan.description}</p>

      <div className="dates">
        <small>📅 Deadline: {assignedDate}</small>
        <br />
        {completionDate && <small>✔ Completed: {completionDate}</small>}
      </div>

      <div className={`status ${computedStatus}`}>
        {computedStatus === "completed" && (
          <>
            <FaCheckCircle color="green" size={14} /> Completed
          </>
        )}
        {computedStatus === "pending" && (
          <>
            <FaHourglassHalf color="#555" size={14} /> Pending
          </>
        )}
        {computedStatus === "failed" && (
          <>
            <FaTimesCircle color="red" size={14} /> Failed
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
