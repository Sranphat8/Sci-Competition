import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import AuthMiddleware from "../middleware/authJwt.js";

// Create a new activity
router.post(
  "/",
  [AuthMiddleware.verifyToken, AuthMiddleware.isManager],
  activityController.createActivity
);

// Get all activities
router.get("/", activityController.getAllActivities);

// Get activity by ID
router.get("/:id", activityController.getActivityById);

// Update activity by ID
router.put(
  "/:id",
  [AuthMiddleware.verifyToken, AuthMiddleware.isManager],
  activityController.updateActivity
);

// Delete activity by ID
router.delete(
  "/:id",
  [AuthMiddleware.verifyToken, AuthMiddleware.isManager],
  activityController.deleteActivity
);

// Search activities
router.get("/search", activityController.searchActivities);

export default router;
