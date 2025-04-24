import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { singleChat } from "../controllers/main.controllers.js";

const router = Router();

router.use(verifyToken);
router.get("/test", async (req, res) => {
  return res.send("Hello from test");
});
router.post("/chat", singleChat);

export default router;
