import Fastify from "fastify";
import cors from "@fastify/cors";
import plansRoutes from "./routes/plans.js";
import "./models/index.js";
const app = Fastify();

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

await app.register(plansRoutes);

app.listen({ port: 5000 }, () => {
  console.log("Server running on http://localhost:5000");
});
