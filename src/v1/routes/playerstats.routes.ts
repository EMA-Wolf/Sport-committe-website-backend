import { Router } from "express";
import { getAllPlayerStatsForASeasonController, getPlayerStatsController } from "../controllers/playerstats.controller";

const router = Router();

router.get("/:id", getPlayerStatsController);
router.get("/season/:seasonId", getAllPlayerStatsForASeasonController);

export default router;
