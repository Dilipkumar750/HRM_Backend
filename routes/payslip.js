import express from "express";
import { sendPayslip } from "../controllers/payslip.controller.js";

const router = express.Router();

router.post("/send", sendPayslip);

export default router;