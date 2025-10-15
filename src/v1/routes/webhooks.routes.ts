import { Router } from "express";
import { sanityCreationOrUpdateWebhook, sanityDeleteWebhook } from "../webhooks/sanity.controller";

const router = Router();

router.post("/test", sanityCreationOrUpdateWebhook);
router.delete("/test", sanityDeleteWebhook);
export default router;