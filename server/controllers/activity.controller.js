import Activity from "../models/activity.model.js";
import { Op } from "sequelize";

const activityController = {};

// Create activity
activityController.createActivity = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      type,
      level,
      location,
      team_size,
      contact_name,
      contact_phone,
      contact_email,
      req_open,
      req_close,
      status,
    } = req.body;

    if (
      !name ||
      !description ||
      !date ||
      !type ||
      !level ||
      !location ||
      !team_size ||
      !req_open ||
      !req_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingActivity = await Activity.findOne({ where: { name } });
    if (existingActivity) {
      return res
        .status(400)
        .json({ message: "Activity name is already existed" });
    }

    const newActivity = await Activity.create({
      name,
      description,
      date,
      type,
      level,
      location,
      team_size,
      req_open,
      req_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    });

    res.status(201).json({
      message: "Activity created successfully",
      activity: newActivity,
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the activity" });
  }
};

// Get all activities
activityController.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching activities" });
  }
};

// Get activity by ID
activityController.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({
      message: "Something went wrong while fetching the activity by ID",
    });
  }
};

// Update activity by ID
activityController.updateActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      date,
      type,
      level,
      location,
      team_size,
      contact_name,
      contact_phone,
      contact_email,
      req_open,
      req_close,
      status,
    } = req.body;

    if (
      !name ||
      !description ||
      !date ||
      !type ||
      !level ||
      !location ||
      !team_size ||
      !req_open ||
      !req_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingActivity = await Activity.findOne({ where: { name } });
    if (existingActivity && existingActivity.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: "Activity name is already existed" });
    }

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.update({
      name,
      description,
      date,
      type,
      level,
      location,
      team_size,
      contact_name,
      contact_phone,
      contact_email,
      req_open,
      req_close,
      status,
    });

    res.status(200).json({ message: "Activity updated successfully", activity });
  } catch (error) {
    console.error("Error updating activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the activity" });
  }
};

// Delete activity by ID
activityController.deleteActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the activity" });
  }
};

// Search activities by filters
activityController.searchActivitiesByName = async (req, res) => {
  try {
    const { name, type, level, status } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (type) {
      whereClause.type = type;
    }
    if (level) {
      whereClause.level = level;
    }
    if (status) {
      whereClause.status = status;
    }

    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error searching activities:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while searching activities" });
  }
};

export default activityController;
