import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { conflictChat } from "../controllers/main.controllers.js";

const router = Router();

router.use(verifyToken);
router.get("/test", async (req, res) => {
  return res.send("V2 Routes are live");
});
router.post("/chat", conflictChat);

export default router;
