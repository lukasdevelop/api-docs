import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create-controller";
import { validate } from "./validate-controller";
import { history } from "./history-controller";
import { metrics } from "./metrics-controller";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";


export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/check-ins/history', history);
  app.post('/check-ins/metrics', metrics);
  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/check-ins/:checkInId/validate', {onRequest: verifyUserRole("ADMIN")}, validate);
} 