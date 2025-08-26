import playerStatsRoutes from "./playerstats.routes";
import { Router } from "express";

const appRouter = Router();

appRouter.use("/playerstats", playerStatsRoutes);

export default appRouter;
