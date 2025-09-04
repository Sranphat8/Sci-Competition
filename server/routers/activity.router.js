import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";
//POST http://localhost:5000/api/v1/activity
router.post("/", activityController.createActivity);    
//GET http://localhost:5000/api/v1/activity
router.get("/", activityController.getAllActivities);
//GET http://localhost:5000/api/v1/activity/:id
router.get("/:id", activityController.getActivityById);
//PUT http://localhost:5000/api/v1/activity/:id
router.put("/:id", activityController.updateActivityById);
//DELETE http://localhost:5000/api/v1/activity/:id
router.delete("/:id", activityController.deleteActivityById);

export default router;  