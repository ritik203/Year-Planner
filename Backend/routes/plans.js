// import {
//   getPlansByYear,
//   createPlan,
//   updateStatus,
//   deletePlan,
// } from "../models/Plan.js";

import {
  getPlansByYear,
  createPlan,
  updateStatus,
  deletePlan,
} from "../business/plan.js";

export default async function (fastify) {
  //  GET plans
  fastify.get(
    "/plans",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["year"],
          properties: {
            year: { type: "string", pattern: "^[0-9]{4}$" },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const { year } = req.query;
        const plans = await getPlansByYear(year);

        const today = new Date().toISOString().split("T")[0];

        const updatedPlans = plans.map((plan) => {
          if (plan.status === "pending" && plan.date < today) {
            return { ...plan, status: "failed" };
          }
          return plan;
        });

        res.send(updatedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        res.code(500).send({ error: "Error while getting the plans" });
      }
    }
  );

  // add new plan
  fastify.post(
    "/plans",
    {
      schema: {
        body: {
          type: "object",
          required: ["title", "description", "date"],
          properties: {
            title: { type: "string", minLength: 3 },
            description: { type: "string", minLength: 5 },
            date: { type: "string", format: "date" },
          },
        },
      },
    },
    async (req, res) => {
      try {
        await createPlan(req.body);
        res.code(201).send({ success: true });
      } catch (err) {
        res.code(500).send({ error: "Failed to create a plan" });
      }
    }
  );

  // update plan
  fastify.put(
    "/plans/:id/complete",
    {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["pending", "completed", "failed"],
            },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;

        await updateStatus(id, status);
        res.send({ success: true });
      } catch (err) {
        res.code(500).send({ error: "Failed to update the status" });
      }
    }
  );

  //delete plan
  fastify.delete(
    "/plans/:id",
    {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const { id } = req.params;
        await deletePlan(id);
        res.send({ success: true });
      } catch (err) {
        console.error("Delete Error:", err);
        res.code(500).send({ error: "Failed to delete" });
      }
    }
  );
}
